import { pool } from "../utils/db.js";

// ------------------------------------------- get all booking for admin -------------------------------------------

export const getAllbookingForAdmin = async (req, res) => {
  let keywords = req.query.keywords;

  if (keywords === undefined) {
    return res.status(400).json({
      message: "Please send keywords parameter in the URL endpoint",
    });
  }
  const results = await pool.query(
    `(SELECT 
      b.*,
      bd.*,
      u.*,
      r.*,
      rt.*,
      array_agg(rp.room_picture) as room_picture       
    FROM rooms_type rt
    LEFT JOIN rooms r ON r.room_type_id = rt.room_type_id
    LEFT JOIN rooms_pictures rp ON rp.room_type_id = rt.room_type_id
    LEFT JOIN booking b ON b.room_id = r.room_id
    LEFT JOIN booking_details bd ON bd.booking_detail_id = b.booking_detail_id
    LEFT JOIN users u ON u.user_id = b.user_id
    
    WHERE bd.check_in_date::date >= CURRENT_DATE
    AND (rt.room_type_name ILIKE $1 
    OR u.username ILIKE $1
    OR rt.bed_type ILIKE $1
    OR CAST(bd.amount_guests AS TEXT) ILIKE $1
    OR CAST(bd.amount_rooms AS TEXT) ILIKE $1
    OR CAST(bd.check_in_date AS TEXT) ILIKE $1
    OR CAST(bd.check_out_date AS TEXT) ILIKE $1)

    GROUP BY 
      b.booking_id,
      bd.booking_detail_id,
      u.user_id,
      rt.room_type_id,
      r.room_id
    ORDER BY 
      bd.check_in_date ASC)        
      
    UNION ALL

    (SELECT 
      b.*,
      bd.*,
      u.*,
      r.*,
      rt.*,
      array_agg(rp.room_picture) as room_picture       
    FROM rooms_type rt
    LEFT JOIN rooms r ON r.room_type_id = rt.room_type_id
    LEFT JOIN rooms_pictures rp ON rp.room_type_id = rt.room_type_id
    LEFT JOIN booking b ON b.room_id = r.room_id
    LEFT JOIN booking_details bd ON bd.booking_detail_id = b.booking_detail_id
    LEFT JOIN users u ON u.user_id = b.user_id

    WHERE bd.check_in_date::date < CURRENT_DATE
    AND (rt.room_type_name ILIKE $1 
    OR u.username ILIKE $1
    OR rt.bed_type ILIKE $1
    OR CAST(bd.amount_guests AS TEXT) ILIKE $1
    OR CAST(bd.amount_rooms AS TEXT) ILIKE $1
    OR CAST(bd.check_in_date AS TEXT) ILIKE $1
    OR CAST(bd.check_out_date AS TEXT) ILIKE $1)

    GROUP BY 
    b.booking_id,
    bd.booking_detail_id,
    u.user_id,
    rt.room_type_id,
    r.room_id
    ORDER BY 
    bd.check_in_date ASC)`,
    [`%${keywords}%`]
  );

  const newArr = results.rows;
  const newResults = [];

  const unique_booking_detail_id = [];

  // Object data that return to client
  for (let i = 0; i < newArr.length; i++) {
    if (
      !unique_booking_detail_id.includes(newArr[i].booking_detail_id) &&
      newArr[i].booking_detail_id !== null
    ) {
      newResults.push({
        booking_detail_id: results.rows[i].booking_detail_id,
        room_type_id: results.rows[i].room_type_id,
        user_id: results.rows[i].user_id,
        username: results.rows[i].username,
        amount_guests: results.rows[i].amount_guests,
        room_type_name: results.rows[i].room_type_name,
        amount_rooms: results.rows[i].amount_rooms,
        bed_type: results.rows[i].bed_type,
        check_in_date: results.rows[i].check_in_date,
        check_out_date: results.rows[i].check_out_date,
        booking_status: results.rows[i].booking_status,
      });
      unique_booking_detail_id.push(newArr[i].booking_detail_id);
    }
  }

  return res.json({
    data: newResults,
  });
};

// ------------------------------------------- get all user's booking -------------------------------------------

export const getAllUser = async (req, res) => {
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

  const unique_booking_detail_id = [];

  // Object data that return to client
  for (let i = 0; i < newArr.length; i++) {
    if (!unique_booking_detail_id.includes(newArr[i].booking_detail_id)) {
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
        // price: newArr[i].price,
        // promotion_price: newArr[i].promotion_price,
        booking_request: bookingRequest[i],
        payment_type: newArr[i].payment_type,
        booking_status: newArr[i].booking_status,
        room_picture: newArr[i].room_picture,
        total_price_per_room: newArr[i].total_price_per_room,
      });
      unique_booking_detail_id.push(newArr[i].booking_detail_id);
    }
  }

  return res.json({
    data: newResults,
  });
};

// ------------------------------------------- get one user's booking by id -------------------------------------------

export const getUserById = async (req, res) => {
  const user_id = Number(req.params.userId);
  const booking_detail_id = Number(req.params.bookingDetailId);

  const results = await pool.query(
    `SELECT 
        bd.*,
        b.*,
        br.*,  
        u.*,
        r.*,
        rt.*,
        array_agg(rp.room_picture) as room_picture       
      FROM rooms_type rt
      LEFT JOIN rooms r ON r.room_type_id = rt.room_type_id
      LEFT JOIN rooms_pictures rp ON rp.room_type_id = rt.room_type_id
      LEFT JOIN booking b ON b.room_id = r.room_id
      LEFT JOIN booking_details bd ON bd.booking_detail_id = b.booking_detail_id
      LEFT JOIN booking_requests br ON br.booking_detail_id = bd.booking_detail_id
      LEFT JOIN users u ON u.user_id = b.user_id
      WHERE u.user_id = $1 AND br.booking_detail_id = $2
      GROUP BY 
        b.booking_id,
        bd.booking_detail_id,
        br.booking_request_id,
        u.user_id,
        rt.room_type_id,
        r.room_id`,
    [user_id, booking_detail_id]
  );

  const newArr = results?.rows?.[0] ?? [];

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
    if (
      bookingRequest[key] !== null &&
      typeof bookingRequest[key] !== "string"
    ) {
      totalRequestPrice = totalRequestPrice + bookingRequest[key];
    }
  }

  const bookingRequestArr = [];
  for (const key in bookingRequest) {
    if (bookingRequest[key] !== null) {
      bookingRequestArr.push([key, bookingRequest[key]]);
    }
  }

  // Object data that return to client
  const newResults = {
    booking_detail_id: newArr.booking_detail_id,
    room_type_id: newArr.room_type_id,
    room_type_name: newArr.room_type_name,
    booking_date: newArr.booking_date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    bed_type: newArr.bed_type[0].toUpperCase() + newArr.bed_type.slice(1),
    cancellation_date: newArr.cancellation_date,
    check_in_date: new Date(newArr.check_in_date).toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    check_out_date: new Date(newArr.check_out_date).toLocaleDateString(
      "en-US",
      {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    ),
    amount_guests: newArr.amount_guests,
    amount_rooms: newArr.amount_rooms,
    total_price_per_room: newArr.total_price_per_room,
    booking_request: bookingRequestArr,
    booking_request_price: totalRequestPrice,
    payment_type:
      newArr.payment_type[0].toUpperCase() + newArr.payment_type.slice(1),
    booking_status: newArr.booking_status,
    room_picture: newArr.room_picture,
    fullname: newArr.fullname,
    username: newArr.username,
  };

  return res.json({
    data: newResults,
  });
};

// ------------------------------------------- update check_in & check_out date -------------------------------------------

export const updateCheckInOut = async (req, res) => {
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
};

// ------------------------------------------- delete - update cancellation_date -------------------------------------------

export const deleteBooking = async (req, res) => {
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

  const bookingDetailData = result.rows?.[0] ?? [];

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
};
