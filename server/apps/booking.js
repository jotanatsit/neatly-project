import { Router } from "express";
import { pool } from "../utils/db.js";
import { protect } from "../middleware/protect.js";

const bookingRouter = Router();

// bookingRouter.use(protect);

// ------------------------------------------- create booking -------------------------------------------

bookingRouter.post("/", async (req, res) => {
  const room_type_id = req.body.room_type_id;
  const user_id = req.body.user_id;

  const booking_details = {
    check_in_date: new Date(req.body.check_in_date).toISOString().slice(0, 10),
    check_out_date: new Date(req.body.check_out_date)
      .toISOString()
      .slice(0, 10),
    amount_guests: req.body.amount_guests,
    amount_rooms: req.body.amount_rooms,
    total_price_per_room: req.body.total_price_per_room,
    payment_type: "credit card", //ข้อมูลmock ถ้าไม่ได้ใช้ เดี๋ยวมาลบออก
    user_credit_card_id: user_id, //ข้อมูลmock ถ้าไม่ได้ใช้ เดี๋ยวมาลบออก
    booking_status: "Complete",
    booking_date: new Date(),
    cancellation_date: null,
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
    // get all booking data in database where room_type_id
    const table1 = await pool.query(
      `select booking.room_id, booking_details.check_in_date, booking_details.check_out_date, rooms.room_type_id
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
        return (
          booking_details.check_in_date < row.check_out_date &&
          booking_details.check_out_date > row.check_in_date
        );
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
          payment_type, user_credit_card_id, booking_status, booking_date, cancellation_date)
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        booking_details.check_in_date,
        booking_details.check_out_date,
        booking_details.amount_guests,
        booking_details.amount_rooms,
        booking_details.total_price_per_room,
        booking_details.payment_type,
        booking_details.user_credit_card_id,
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
  } catch (error) {
    return res.json({ message: error.message });
  }

  return res.status(200).json({
    message: "Booking has been created successfully",
  });
});

// ------------------------------------------- get all user's booking -------------------------------------------

bookingRouter.get("/:userId", async (req, res) => {
  const user_id = Number(req.params.userId);

  const results = await pool.query(
    `SELECT 
        bd.*,
        b.*,
        br.*,
        r.*,
        rt.*,
        array_agg(rp.room_picture) as room_picture       
      FROM rooms_type rt
      LEFT JOIN rooms r ON r.room_type_id = rt.room_type_id
      LEFT JOIN rooms_pictures rp ON rp.room_type_id = rt.room_type_id
      LEFT JOIN booking b ON b.room_id = r.room_id
      LEFT JOIN booking_details bd ON bd.booking_detail_id = b.booking_detail_id
      LEFT JOIN booking_requests br ON br.booking_detail_id = bd.booking_detail_id
      WHERE b.user_id = $1
      GROUP BY 
        b.booking_id,
        bd.booking_detail_id,
        br.booking_request_id,
        rt.room_type_id,
        r.room_id
      ORDER BY 
        bd.booking_detail_id DESC;`,
    [user_id]
  );

  const newArr = results.rows;
  const newResults = [];

  // Create new array of object that contain booking_request key-value pairs
  const temp = newArr.map((item) => {
    const booking_request = {
      early_check_in: item.early_check_in,
      late_check_out: item.late_check_out,
      non_smoking_room: item.non_smoking_room,
      a_room_on_the_high_floor: item.a_room_on_the_high_floor,
      a_quiet_room: item.a_quiet_room,
      baby_cot: item.baby_cot,
      airport_transfer: item.airport_transfer,
      extra_bed: item.extra_bed,
      extra_pillows: item.extra_pillows,
      phone_chargers_and_adapters: item.phone_chargers_and_adapters,
      breakfast: item.breakfast,
      additional_request: item.additional_request,
    };
    return booking_request;
  });

  // Collect booking_request key-value pairs to Array of array - [[late_check_out, 0],[extra_bed, 500],[additional_request, "add something"], ...]
  const bookingRequest = temp.map((item) => {
    const arr = [];
    for (const key in item) {
      if (item[key] !== null) {
        arr.push([key, item[key]]);
      }
    }
    return arr;
  });

  // Object data that return to client
  for (let i = 0; i < newArr.length; i++) {
    newResults.push({
      booking_detail_id: newArr[i].booking_detail_id,
      room_type_id: newArr[i].room_type_id,
      room_type_name: newArr[i].room_type_name,
      booking_date: newArr[i].booking_date,
      cancellation_date: newArr[i].cancellation_date,
      check_in_date: newArr[i].check_in_date,
      check_out_date: newArr[i].check_out_date,
      amount_guests: newArr[i].amount_guests,
      amount_rooms: newArr[i].amount_rooms,
      price: newArr[i].price,
      promotion_price: newArr[i].promotion_price,
      booking_request: bookingRequest[i],
      payment_type: newArr[i].payment_type,
      booking_status: newArr[i].booking_status,
      room_picture: newArr[i].room_picture,
    });
  }

  return res.json({
    data: newResults,
  });
});

// ------------------------------------------- get one user's booking by id -------------------------------------------

bookingRouter.get("/:userId/:bookingDetailId", async (req, res) => {
  const user_id = Number(req.params.userId);
  const booking_detail_id = Number(req.params.bookingDetailId);

  const results = await pool.query(
    `SELECT 
        bd.*,
        b.*,
        br.*,
        r.*,
        rt.*,
        array_agg(rp.room_picture) as room_picture       
      FROM rooms_type rt
      LEFT JOIN rooms r ON r.room_type_id = rt.room_type_id
      LEFT JOIN rooms_pictures rp ON rp.room_type_id = rt.room_type_id
      LEFT JOIN booking b ON b.room_id = r.room_id
      LEFT JOIN booking_details bd ON bd.booking_detail_id = b.booking_detail_id
      LEFT JOIN booking_requests br ON br.booking_detail_id = bd.booking_detail_id
      WHERE b.user_id = $1 AND br.booking_detail_id = $2
      GROUP BY 
        b.booking_id,
        bd.booking_detail_id,
        br.booking_request_id,
        rt.room_type_id,
        r.room_id`,
    [user_id, booking_detail_id]
  );

  const newArr = results.rows[0];

  // Create new object that contain booking_request key-value pairs
  const bookingRequest = {
    early_check_in: newArr.early_check_in,
    late_check_out: newArr.late_check_out,
    non_smoking_room: newArr.non_smoking_room,
    a_room_on_the_high_floor: newArr.a_room_on_the_high_floor,
    a_quiet_room: newArr.a_quiet_room,
    baby_cot: newArr.baby_cot,
    airport_transfer: newArr.airport_transfer,
    extra_bed: newArr.extra_bed,
    extra_pillows: newArr.extra_pillows,
    phone_chargers_and_adapters: newArr.phone_chargers_and_adapters,
    breakfast: newArr.breakfast,
    additional_request: newArr.additional_request,
  };

  // Sum value of key in booking_requests - return total price of booking_requests - number
  let totalRequestPrice = 0;
  for (const key in bookingRequest) {
    if (bookingRequest[key] !== null) {
      totalRequestPrice = totalRequestPrice + bookingRequest[key];
    }
  }

  // Object data that return to client
  const newResults = {
    booking_detail_id: newArr.booking_detail_id,
    room_type_id: newArr.room_type_id,
    room_type_name: newArr.room_type_name,
    booking_date: newArr.booking_date,
    cancellation_date: newArr.cancellation_date,
    check_in_date: newArr.check_in_date,
    check_out_date: newArr.check_out_date,
    amount_guests: newArr.amount_guests,
    amount_rooms: newArr.amount_rooms,
    price: newArr.price,
    promotion_price: newArr.promotion_price,
    booking_request_price: totalRequestPrice,
    payment_type: newArr.payment_type,
    booking_status: newArr.booking_status,
    room_picture: newArr.room_picture,
  };

  return res.json({
    data: newResults,
  });
});

// ------------------------------------------- update check_in & check_out date -------------------------------------------

bookingRouter.put("/:userId/:bookingDetailId", async (req, res) => {
  const user_id = Number(req.params.userId);
  const booking_detail_id = Number(req.params.bookingDetailId);

  const booking_details = {
    room_type_id: req.body.room_type_id,
    amount_rooms: req.body.amount_rooms,
    check_in_date: new Date(req.body.check_in_date).toISOString().slice(0, 10),
    check_out_date: new Date(req.body.check_out_date)
      .toISOString()
      .slice(0, 10),
  };

  // get user data in database where booking_detail_id
  const userData = await pool.query(
    `select booking.booking_detail_id, booking.booking_id, booking.room_id
          from booking_details
          inner join booking
          ON booking_details.booking_detail_id = booking.booking_detail_id
          where booking.booking_detail_id=$1`,
    [booking_detail_id]
  );

  const userData_booking_id = userData.rows.map((row) => row.booking_id);

  // get all booking data in database where room_type_id
  const table1 = await pool.query(
    `select booking.room_id, booking_details.check_in_date, booking_details.check_out_date, rooms.room_type_id
          from booking_details
          inner join booking
          ON booking_details.booking_detail_id = booking.booking_detail_id
          inner join rooms
          ON booking.room_id = rooms.room_id
          where rooms.room_type_id=$1`,
    [booking_details.room_type_id]
  );

  const bookingDetailData = table1.rows;

  // Unavailable rooms for booking - array - [8]
  const unAvailableRooms = bookingDetailData
    .filter((row) => {
      return (
        booking_details.check_in_date < row.check_out_date &&
        booking_details.check_out_date > row.check_in_date
      );
    })
    .map((row) => row.room_id);

  const table2 = await pool.query(`select * from rooms where room_type_id=$1`, [
    booking_details.room_type_id,
  ]);

  // All rooms in the same room type - array - [5, 6, 7, 8]
  const allRooms = table2.rows.map((room) => room.room_id);

  // Available rooms for booking - array - [5, 6, 7]
  const availableRooms = allRooms.filter(
    (room) => !unAvailableRooms.includes(room)
  );

  if (booking_details.amount_rooms > availableRooms.length) {
    return res.json({ message: `The booking date has no available rooms.` });
  }

  // update check_in_date, check_out_date in booking_details
  await pool.query(
    `update booking_details set check_in_date=$1, check_out_date=$2 where booking_detail_id=$3`,
    [
      booking_details.check_in_date,
      booking_details.check_out_date,
      booking_detail_id,
    ]
  );

  // update room_id in booking
  for (let i = 0; i < booking_details.amount_rooms; i++) {
    await pool.query(`update booking set room_id=$1 where booking_id=$2`, [
      availableRooms[i],
      userData_booking_id[i],
    ]);
  }

  return res.json({
    message: `Booking has been updated successfully`,
  });
});

// ------------------------------------------- delete - update cancellation_date -------------------------------------------

bookingRouter.delete("/:userId/:bookingDetailId", async (req, res) => {
  const user_id = Number(req.params.userId);
  const booking_detail_id = Number(req.params.bookingDetailId);
  const booking_status = "Cancel";
  const cancellation_date = new Date();

  const result = await pool.query(
    `select * from booking_details
    inner join booking
    on booking_details.booking_detail_id = booking.booking_detail_id
    where booking_details.booking_detail_id=$1`,
    [booking_detail_id]
  );

  const bookingDetailData = result.rows[0];

  if (
    bookingDetailData.user_id !== user_id ||
    bookingDetailData.booking_status === "Cancel"
  ) {
    return res.json({
      message: `Booking not found.`,
    });
  }

  await pool.query(
    `update booking_details set booking_status=$1, cancellation_date=$2 where booking_detail_id=$3`,
    [booking_status, cancellation_date, booking_detail_id]
  );

  return res.json({
    message: `Booking has been cancelled.`,
  });
});
export default bookingRouter;
