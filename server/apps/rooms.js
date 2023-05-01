import { Router } from "express";
import { pool } from "../utils/db.js";

const roomRouter = Router();

// ----------------------------- get maximum guests for 1 room & maximum rooms in 1 room_type ---------------------------------

roomRouter.get("/room-type/max-guests", async (req, res) => {
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
});

// ------------------------------------------- create api get room type by type id -------------------------------------------

roomRouter.get("/room-type/:id", async (req, res) => {
  const roomTypeId = req.params.id;

  if (!roomTypeId) {
    return res.status(401).json({
      message: "Please specified post id in order to get the post",
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
      ORDER BY
        rt.room_type_id ASC;`,
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
    price: newArr.price,
    promotion_price: newArr.promotion_price,
    room_amenity_id: newArr.room_amenity_id,
    room_amenity: amenityResult,
    room_picture: newArr.room_picture,
  };

  return res.json({
    data: newResult,
  });
});

export default roomRouter;
