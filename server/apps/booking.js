import { Router } from "express";
import { pool } from "../utils/db.js";

const bookingRouter = Router();

bookingRouter.post("/", async (req, res) => {
  const room_type_id = req.body.room_type_id;

  const payments = {
    payment_type: req.body.payment_type,
    user_credit_card_id: req.body.user_credit_card_id,
    amount_rooms: req.body.amount_rooms,
    total_price_per_room: req.body.total_price_per_room,
  };

  const booking = {
    user_id: req.body.user_id,
    amount_guests: req.body.amount_guests,
    check_in_date: req.body.check_in_date,
    check_out_date: req.body.check_out_date,
    booking_status: req.body.booking_status,
    booking_date: req.body.booking_date,
    cancellation_date: req.body.cancellation_date,
  };

  const booking_requests = {
    early_check_in: req.body.early_check_in,
    late_check_out: req.body.late_check_out,
    non_smoking_room: req.body.non_smoking_room,
    a_room_on_the_high_floor: req.body.a_room_on_the_high_floor,
    a_quiet_room: req.body.a_quiet_room,
    baby_cot: req.body.baby_cot,
    airport_transfer: req.body.airport_transfer,
    extra_bed: req.body.extra_bed,
    extra_pillows: req.body.extra_pillows,
    phone_chargers_and_adapters: req.body.phone_chargers_and_adapters,
    breakfast: req.body.breakfast,
    additional_request: req.body.additional_request,
  };

  try {
    // get booking data
    const table1 = await pool.query(
      `select booking.room_id, booking.check_in_date, booking.check_out_date, rooms.room_type_id 
        from booking
        inner join rooms
        ON booking.room_id = rooms.room_id
        where rooms.room_type_id=$1`,
      [room_type_id]
    );

    // const unavailableRooms = []; // ห้องที่ booking ไม่ได้

    // for (let i = 0; i < table1.rows.length; i++) {
    //   if (booking.check_in_date < table1.rows[i].check_out_date) {
    //     if (booking.check_out_date > table1.rows[i].check_in_date) {
    //       unavailableRooms.push(table1.rows[i].room_id);
    //     }
    //   }
    // }
    // console.log(unavailableRooms);

    // Unavailable rooms for booking
    const unavailableRooms = table1.rows
      .filter((row) => {
        return (
          check_in_date < row.check_out_date &&
          check_out_date > row.check_in_date
        );
      })
      .map((row) => row.room_id);
    console.log(unavailableRooms); //

    const table2 = await pool.query(
      `select * from rooms where room_type_id=$1`,
      [room_type_id]
    );

    // All rooms in the same room type
    const allRooms = table2.rows.map((room) => room.room_id);
    console.log(allRooms);

    // Available rooms for booking
    const availableRoom = allRooms.filter(
      (room) => !unavailableRooms.includes(room)
    );
    console.log(availableRoom);

    // create payment data
    await pool.query(
      `insert into payments (payment_type, user_credit_card_id, amount_rooms, total_price_per_room)
        values ($1, $2, $3, $4)`,
      [
        payments.payment_type,
        payments.user_credit_card_id,
        payments.amount_rooms,
        payments.total_price_per_room,
      ]
    );

    // get payment_id from lastest booking
    let lastest_payment_id = await pool.query(
      `select payment_id from payments order by payment_id desc limit $1`,
      [1]
    );

    // create booking data
    for (let i = 0; i < payments.amount_rooms; i++) {
      await pool.query(
        `insert into booking (user_id, room_id, amount_guests, check_in_date, check_out_date, payment_id, booking_status, booking_date, cancellation_date)
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          booking.user_id,
          availableRoom[i],
          booking.amount_guests,
          booking.check_in_date,
          booking.check_out_date,
          lastest_payment_id.rows[0].payment_id,
          booking.booking_status,
          booking.booking_date,
          booking.cancellation_date,
        ]
      );
    }

    // get booking_id from lastest booking
    let lastest_booking_id = await pool.query(
      `select booking_id from booking order by booking_id desc limit $1`,
      [payments.amount_rooms]
    );
    let lastest_booking_id_reverse = lastest_booking_id.rows.reverse();

    // create booking_requests data
    for (let i = 0; i < payments.amount_rooms; i++) {
      await pool.query(
        `insert into booking_requests (booking_id, early_check_in, late_check_out, non_smoking_room,
        a_room_on_the_high_floor, a_quiet_room, baby_cot, airport_transfer, extra_bed, extra_pillows,
        phone_chargers_and_adapters, breakfast, additional_request)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [
          lastest_booking_id_reverse[i].booking_id,
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
    }
  } catch (error) {
    return res.json({ message: error.message });
  }

  return res.status(200).json({
    message: "Booking has been created successfully",
  });
});

bookingRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
});

bookingRouter.put("/", async (req, res) => {});

bookingRouter.delete("/", async (req, res) => {});

export default bookingRouter;
