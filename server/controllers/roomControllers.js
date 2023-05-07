import { pool } from "../utils/db.js";

// ----------------------------- get maximum guests for 1 room & maximum rooms in 1 room_type ---------------------------------

export const maximumSearch = async (req, res) => {
  // count maximum guests for 1 room
  let result1;
  try {
    result1 = await pool.query(`select max(amount_person) from rooms_type`);
  } catch {
    return res.json({
      message: "There is some error occured on the database",
    });
  }

  // count maximum rooms in 1 room_type
  let result2;
  try {
    result2 = await pool.query(`
    SELECT MAX(count)
    FROM (
      SELECT room_type_id, COUNT(*) as count
      FROM rooms
      GROUP BY room_type_id
      
    ) AS subquery;`);
  } catch {
    return res.json({
      message: "There is some error occured on the database",
    });
  }

  const maximum = {};
  maximum["guests"] = Number(result1?.rows[0].max);
  maximum["rooms"] = Number(result2?.rows[0].max);

  return res.json({
    data: maximum,
  });
};

// ------------------------- get room type by search (get guest more than amount search) ------------------------------

export const getRoomTypeBySearch = async (req, res) => {
  const check_in_date = new Date(req.query.check_in_date)
    .toISOString()
    .slice(0, 10);
  const check_out_date = new Date(req.query.check_out_date)
    .toISOString()
    .slice(0, 10);
  const amount_guests = parseInt(req.query.amount_guests);

  try {
    const max_guests_per_room = await pool.query(
      `SELECT MAX(amount_person) as max_guests FROM rooms_type`
    );
    const max_guests = max_guests_per_room.rows[0].max_guests;

    const roomsTypeData = [];

    for (let guests = amount_guests; guests <= max_guests; guests++) {
      const table1 = await pool.query(
        `SELECT booking.room_id, booking_details.check_in_date, booking_details.check_out_date, booking_details.booking_status, rooms.room_type_id, rooms_type.amount_person
         FROM booking
         INNER JOIN booking_details ON booking_details.booking_detail_id = booking.booking_detail_id
         INNER JOIN rooms ON booking.room_id = rooms.room_id
         INNER JOIN rooms_type ON rooms.room_type_id = rooms_type.room_type_id
         WHERE rooms_type.amount_person >= $1 AND rooms_type.amount_person <= $2
         ORDER BY rooms_type.amount_person ASC`,
        [guests, max_guests]
      );

      const unAvailableRooms = table1.rows
        .filter((row) => {
          if (row.booking_status === "Complete") {
            return (
              check_in_date < row.check_out_date &&
              check_out_date > row.check_in_date
            );
          }
        })
        .map((row) => row.room_id);

      const table2 = await pool.query(
        `SELECT rooms.room_id, rooms.room_type_id, rooms_type.amount_person
        FROM rooms
        INNER JOIN rooms_type ON rooms.room_type_id = rooms_type.room_type_id
        WHERE rooms_type.amount_person >= $1 AND rooms_type.amount_person <= $2
        ORDER BY rooms_type.amount_person ASC`,
        [guests, max_guests]
      );

      const allRooms = table2.rows.map((room) => room.room_id);

      const availableRooms = allRooms.filter(
        (room) => !unAvailableRooms.includes(room)
      );

      const availableRoomType = table2.rows
        .filter((room) => availableRooms.includes(room.room_id))
        .map((room) => room.room_type_id);

      const roomsTypeForBooking = Object.entries(
        availableRoomType.reduce((acc, val) => {
          acc[val] = (acc[val] || 0) + 1;
          return acc;
        }, {})
      ).map(([key, value]) => [parseInt(key), value]);

      for (let i = 0; i < roomsTypeForBooking.length; i++) {
        const results = await pool.query(
          `SELECT 
            rt.*, 
            array_agg(rp.room_picture) as room_picture       
           FROM rooms_type rt
           LEFT JOIN rooms_pictures rp ON rp.room_type_id = rt.room_type_id
           WHERE rt.room_type_id = $1
           GROUP BY rt.room_type_id
           ORDER BY rt.amount_person ASC`,
          [roomsTypeForBooking[i][0]]
        );

        results.rows[0] = {
          ...results.rows[0],
          available_room: roomsTypeForBooking[i][1],
        };

        roomsTypeData.push(results.rows[0]);
      }
      roomsTypeData.sort((a, b) => a.amount_person - b.amount_person);
      return res.status(200).json({ data: roomsTypeData });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};

// ------------------------------------------- get all rooms type -------------------------------------------

export const getRoomType = async (req, res) => {
  let result;
  let newResult = [];
  let keywords = req.query.keywords;

  if (keywords === undefined) {
    return res.status(400).json({
      message: "Please send keywords parameter in the URL endpoint",
    });
  }

  try {
    result = await pool.query(
      `SELECT
        rt.*,
        ra.*,
        array_agg(rp.room_picture) as room_picture
      FROM rooms_type rt
      LEFT JOIN rooms_pictures rp ON rp.room_type_id = rt.room_type_id
      LEFT JOIN rooms_amenities ra ON ra.room_type_id = rt.room_type_id
      WHERE rt.room_type_name ILIKE $1 OR rt.bed_type ILIKE $2
      OR CAST(rt.price AS TEXT) ILIKE $3
      OR CAST(rt.promotion_price AS TEXT) ILIKE $4
      OR CAST(rt.amount_person AS TEXT) ILIKE $5
      OR CAST(rt.room_size AS TEXT) ILIKE $6
      GROUP BY
        rt.room_type_id,
        ra.room_amenity_id
      ORDER BY 
      rt.room_type_id ASC;
      `,
      [
        `%${keywords}%`,
        `%${keywords}%`,
        `%${keywords}%`,
        `%${keywords}%`,
        `%${keywords}%`,
        `%${keywords}%`,
      ]
    );
  } catch {
    return res.json({
      message: "There is some error occured on the database",
    });
  }

  const newArr = result?.rows ?? [];

  for (let i = 0; i < newArr.length; i++) {
    const temp = {
      id: newArr?.[i].room_type_id,
      safe_in_room: newArr?.[i].safe_in_room,
      air_conditioning: newArr?.[i].air_conditioning,
      high_speed_internet: newArr?.[i].high_speed_internet,
      hairdryer: newArr?.[i].hairdryer,
      shower: newArr?.[i].shower,
      bathroom_amenities: newArr?.[i].bathroom_amenities,
      lamp: newArr?.[i].lamp,
      minibar: newArr?.[i].minibar,
      telephone: newArr?.[i].telephone,
      ironing_board: newArr?.[i].ironing_board,
      floor_accessible: newArr?.[i].floor_accessible,
      alarm_clock: newArr?.[i].alarm_clock,
      bathrobe: newArr?.[i].bathrobe,
    };

    const amenityResult = [];
    for (const key in temp) {
      if (temp[key] === true) {
        amenityResult.push(key);
      }
    }

    newResult.push({
      room_type_id: newArr?.[i].room_type_id,
      room_type_name: newArr?.[i].room_type_name,
      room_size: newArr?.[i].room_size,
      bed_type: newArr?.[i].bed_type,
      amount_person: newArr?.[i].amount_person,
      description: newArr?.[i].description,
      price: newArr?.[i].price,
      promotion_price: newArr?.[i].promotion_price,
      room_amenity_id: newArr?.[i].room_amenity_id,
      room_amenity: amenityResult,
      room_picture: newArr?.[i].room_picture,
    });
  }

  return res.json({
    data: newResult,
  });
};

// ------------------------------------------- get room type by type id -------------------------------------------

export const getRoomTypeById = async (req, res) => {
  const roomTypeId = req.params.id;

  if (!roomTypeId) {
    return res.status(401).json({
      message: "Please specified room type id in order to get a room type",
    });
  }

  let result;

  try {
    result = await pool.query(
      `SELECT
        rt.*,
        ra.*,
        array_agg(rp.room_picture) as room_picture
      FROM rooms_type rt
      LEFT JOIN rooms_pictures rp ON rp.room_type_id = rt.room_type_id
      LEFT JOIN rooms_amenities ra ON ra.room_type_id = rt.room_type_id
      WHERE rt.room_type_id = $1
      GROUP BY
        rt.room_type_id,
        ra.room_amenity_id
      `,
      [roomTypeId]
    );
  } catch {
    return res.json({
      message: "There is some error occured on the database",
    });
  }

  const newArr = result?.rows?.[0] ?? [];

  // if need to send result for object in array
  // const newResult = []
  const temp = {
    id: newArr.room_type_id,
    safe_in_room: newArr.safe_in_room,
    air_conditioning: newArr.air_conditioning,
    high_speed_internet: newArr.high_speed_internet,
    hairdryer: newArr.hairdryer,
    shower: newArr.shower,
    bathroom_amenities: newArr.bathroom_amenities,
    lamp: newArr.lamp,
    minibar: newArr.minibar,
    telephone: newArr.telephone,
    ironing_board: newArr.ironing_board,
    floor_accessible: newArr.floor_accessible,
    alarm_clock: newArr.alarm_clock,
    bathrobe: newArr.bathrobe,
  };

  const amenityResult = [];
  for (const key in temp) {
    if (temp[key] === true) {
      amenityResult.push(key);
    }
  }

  const newResult = {
    room_type_id: newArr.room_type_id,
    room_type_name: newArr.room_type_name,
    room_size: newArr.room_size,
    bed_type: newArr.bed_type,
    amount_person: newArr.amount_person,
    description: newArr.description,
    price: Number(newArr.price),
    promotion_price: Number(newArr.promotion_price),
    room_amenity_id: newArr.room_amenity_id,
    room_amenity: amenityResult,
    room_picture: newArr.room_picture,
  };

  return res.json({
    data: newResult,
  });
};

// ------------------------------ edit price and promotion_price by room type id --------------------------------

export const editRoomPrice = async (req, res) => {
  const roomTypeId = req.params.id;
  let price = req.body.price;
  let promotionPrice = req.body.promotion_price;

  if (promotionPrice === 0) {
    promotionPrice = null;
  }

  if (!roomTypeId) {
    return res.status(401).json({
      message: "Please specified room type id in order to update a room type",
    });
  }

  await pool.query(
    "update rooms_type set price=$1, promotion_price=$2 where room_type_id=$3",
    [price, promotionPrice, roomTypeId]
  );

  return res.json({
    message: "Room type has been successfully updated",
  });
};

// ------------------------------------------- get all rooms -------------------------------------------

export const getAllRoom = async (req, res) => {
  let result;
  let newResult = [];
  let keywords = req.query.keywords;

  if (keywords === undefined) {
    return res.status(400).json({
      message: "Please send keywords parameter in the URL endpoint",
    });
  }

  try {
    result = await pool.query(
      `SELECT
        rt.*,
        r.*
      FROM rooms_type rt
      LEFT JOIN rooms r ON r.room_type_id = rt.room_type_id
      WHERE rt.room_type_name ILIKE $1 OR CAST(r.room_number AS TEXT) ILIKE $2
    OR rt.bed_type ILIKE $3 OR r.room_status ILIKE $4
      GROUP BY
        r.room_id,
        rt.room_type_id
      ORDER BY 
        r.room_id ASC;
      `,
      [`%${keywords}%`, `%${keywords}%`, `%${keywords}%`, `%${keywords}%`]
    );
  } catch {
    return res.json({
      message: "There is some error occured on the database",
    });
  }

  const newArr = result?.rows ?? [];

  for (let i = 0; i < newArr.length; i++) {
    newResult.push({
      room_id: newArr?.[i].room_id,
      room_number: newArr?.[i].room_number,
      room_type_name: newArr?.[i].room_type_name,
      bed_type: newArr?.[i].bed_type,
      room_status: newArr?.[i].room_status,
    });
  }

  return res.json({
    data: newResult,
  });
};

// ------------------------------------------- api for change room status -------------------------------------------

export const editRoomStatus = async (req, res) => {
  const room_number = Number(req.params.roomId);

  const room = {
    status: req.body.room_status,
  };

  try {
    await pool.query(
      `update rooms
      set room_status= $1
      where room_id = $2`,
      [room.status, room_number]
    );

    return res.json({
      message: `Room status has been updated successfully`,
    });
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};
