import { pool } from "../utils/db.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  const data = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.price_check_out * 100,
      currency: "thb",
      metadata: data,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(400).json({ error: { message: err.message } });
  }
};

export const stripeConfig = async (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
};

export const stripeWebhook = async (req, res) => {
  let data, eventType, eventId;
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    let event;
    const sig = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`Error messsage: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    data = event.data;
    eventType = event.type;
    eventId = event.id;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // we can retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  // Handle the event
  //   console.log(`Unhandled event type ${event.type}`);

  if (eventType === "payment_intent.created") {
    const paymentIntent = data.object;

    console.log(
      `[${eventId}] PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`
    );
  }
  if (eventType === "payment_intent.succeeded") {
    const paymentIntent = data.object;
    const checkOutData = data.object.metadata;

    console.log(`payment ID : ${paymentIntent.id}`);
    // console.log(data);
    // console.log(checkOutData);

    const room_type_id = Number(checkOutData.room_type_id);
    const user_id = Number(checkOutData.user_id);
    const booking_details = {
      check_in_date: new Date(checkOutData.check_in_date)
        .toISOString()
        .slice(0, 10),
      check_out_date: new Date(checkOutData.check_out_date)
        .toISOString()
        .slice(0, 10),
      amount_guests: Number(checkOutData.amount_guests),
      amount_rooms: Number(checkOutData.amount_rooms),
      total_price_per_room: Number(checkOutData.total_price_per_room),
      payment_type: "credit card",
      payment_id: paymentIntent.id,
      booking_status: "Complete",
      booking_date: new Date(),
      cancellation_date: null,
    };

    const booking_requests = {
      early_check_in: checkOutData.early_check_in,
      late_check_out: checkOutData.late_check_out,
      non_smoking_room: checkOutData.non_smoking_room,
      a_room_on_the_high_floor: checkOutData.a_room_on_the_high_floor,
      a_quiet_room: checkOutData.a_quiet_room,
      baby_cot: checkOutData.baby_cot,
      airport_transfer: checkOutData.airport_transfer,
      extra_bed: checkOutData.extra_bed,
      extra_pillows: checkOutData.extra_pillows,
      phone_chargers_and_adapters: checkOutData.phone_chargers_and_adapters,
      breakfast: checkOutData.breakfast,
      additional_request: checkOutData.additional_request,
    };

    // แปลง value ของ booking_requests จาก 'string' ให้เป็น 'number' กับ 'null'
    for (let key in booking_requests) {
      if (booking_requests[key] === "") {
        booking_requests[key] = null;
      } else if (key === "additional_request") {
        booking_requests[key] = booking_requests[key];
      } else {
        booking_requests[key] = Number(booking_requests[key]);
      }
    }

    // get all booking data in database where room_type_id
    const table1 = await pool.query(
      `select booking.room_id, booking_details.check_in_date, booking_details.check_out_date, booking_details.booking_status, rooms.room_type_id
          from booking_details
          inner join booking
          ON booking_details.booking_detail_id = booking.booking_detail_id
          inner join rooms
          ON booking.room_id = rooms.room_id
          where rooms.room_type_id=$1`,
      [room_type_id]
    );

    // Unavailable rooms for booking - array - [8]
    const unAvailableRooms = table1.rows
      .filter((row) => {
        if (row.booking_status === "Complete") {
          return (
            booking_details.check_in_date < row.check_out_date &&
            booking_details.check_out_date > row.check_in_date
          );
        }
      })
      .map((row) => row.room_id);

    // get all rooms data in database where room_type_id
    const table2 = await pool.query(
      `select * from rooms where room_type_id=$1`,
      [room_type_id]
    );

    // All rooms in the same room type - array - [5, 6, 7, 8]
    const allRooms = table2.rows.map((room) => room.room_id);

    // Available rooms for booking - array - [5, 6, 7]
    const availableRooms = allRooms.filter(
      (room) => !unAvailableRooms.includes(room)
    );

    // create booking_details data
    await pool.query(
      `insert into booking_details (check_in_date, check_out_date, amount_guests, amount_rooms, total_price_per_room,
          payment_type, payment_id, booking_status, booking_date, cancellation_date)
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        booking_details.check_in_date,
        booking_details.check_out_date,
        booking_details.amount_guests,
        booking_details.amount_rooms,
        booking_details.total_price_per_room,
        booking_details.payment_type,
        booking_details.payment_id,
        booking_details.booking_status,
        booking_details.booking_date,
        booking_details.cancellation_date,
      ]
    );

    // get payment_id from lastest booking
    const lastest_booking_detail = await pool.query(
      `select booking_detail_id from booking_details order by booking_detail_id desc limit $1`,
      [1]
    );

    // create booking data
    for (let i = 0; i < booking_details.amount_rooms; i++) {
      await pool.query(
        `insert into booking (user_id, room_id, booking_detail_id)
                values ($1, $2, $3)`,
        [
          user_id,
          availableRooms[i],
          lastest_booking_detail.rows[0].booking_detail_id,
        ]
      );
    }

    // create booking_requests data
    await pool.query(
      `insert into booking_requests (booking_detail_id, early_check_in, late_check_out, non_smoking_room,
            a_room_on_the_high_floor, a_quiet_room, baby_cot, airport_transfer, extra_bed, extra_pillows,
            phone_chargers_and_adapters, breakfast, additional_request)
           values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        lastest_booking_detail.rows[0].booking_detail_id,
        booking_requests.early_check_in,
        booking_requests.late_check_out,
        booking_requests.non_smoking_room,
        booking_requests.a_room_on_the_high_floor,
        booking_requests.a_quiet_room,
        booking_requests.baby_cot,
        booking_requests.airport_transfer,
        booking_requests.extra_bed,
        booking_requests.extra_pillows,
        booking_requests.phone_chargers_and_adapters,
        booking_requests.breakfast,
        booking_requests.additional_request,
      ]
    );

    console.log("💰 Payment captured!");
    return res.status(200).json({
      message: "Booking has been created successfully",
    });
  } else if (eventType === "payment_intent.payment_failed") {
    console.log("❌ Payment failed.");
  } else if (eventType === "payment)_intent.refund") {
  }
  res.sendStatus(200);
  // Return a 200 response to acknowledge receipt of the event
  // res.send({ received: true });
};
