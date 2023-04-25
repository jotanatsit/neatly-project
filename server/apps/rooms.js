import { Router } from "express";
import { pool } from "../utils/db.js";

const roomRouter = Router();

//create api get rooms data
roomRouter.get("/", async (req, res) => {
  const results = await pool.query(
    `SELECT 
      r.*,
      rt.*,
      ra.*,
      array_agg(rp.room_picture) as room_picture       
    FROM rooms_type rt
    LEFT JOIN rooms r ON r.room_type_id = rt.room_type_id
    LEFT JOIN rooms_pictures rp ON rp.room_type_id = rt.room_type_id
    LEFT JOIN rooms_amenities ra ON ra.room_amenity_id = rt.room_type_id
    GROUP BY 
      rt.room_type_id,
      r.room_id,
      ra.room_amenity_id
    ORDER BY 
      r.room_number ASC;`
  );

  const newArr = results.rows;

  const newResult = [];
  const temp = newArr.map((item) => {
    const amenity = {
      //put id for eazy to console.log for checking
      id: item.room_id,
      safe_in_room: item.safe_in_room,
      air_conditioning: item.air_conditioning,
      high_speed_internet: item.high_speed_internet,
      hairdryer: item.hairdryer,
      shower: item.shower,
      bathroom_amenities: item.bathroom_amenities,
      lamp: item.lamp,
      minibar: item.minibar,
      telephone: item.telephone,
      ironing_board: item.ironing_board,
      floor_accessible: item.floor_accessible,
      alarm_clock: item.alarm_clock,
      bathrobe: item.bathrobe,
    };
    return amenity;
  });

  const amenityResult = temp.map((item) => {
    const arr = [];
    for (const key in item) {
      if (item[key] === true) {
        arr.push(key);
      }
    }
    return arr;
  });

  for (let i = 0; i < newArr.length; i++) {
    newResult.push({
      room_id: newArr[i].room_id,
      room_number: newArr[i].room_number,
      room_type_id: newArr[i].room_type_id,
      room_status: newArr[i].room_status,
      room_type_name: newArr[i].room_type_name,
      room_size: newArr[i].room_size,
      bed_type: newArr[i].bed_type,
      amount_person: newArr[i].amount_person,
      description: newArr[i].description,
      price: newArr[i].price,
      promotion_price: newArr[i].promotion_price,
      room_amenity_id: newArr[i].room_amenity_id,
      room_amenity: amenityResult[i],
      room_picture: newArr[i].room_picture,
    });
  }

  return res.json({
    data: newResult,
  });
});

//create api get room by id
roomRouter.get("/:id", async (req, res) => {
  const roomId = req.params.id;

  if (!roomId) {
    return res.status(401).json({
      message: "Please specified post id in order to get the post",
    });
  }

  let result;

  try {
    result = await pool.query(
      `SELECT 
        r.*,
        rt.*,
        ra.*,
        array_agg(rp.room_picture) as room_picture       
      FROM rooms_type rt
      LEFT JOIN rooms r ON r.room_type_id = rt.room_type_id
      LEFT JOIN rooms_pictures rp ON rp.room_type_id = rt.room_type_id
      LEFT JOIN rooms_amenities ra ON ra.room_amenity_id = rt.room_type_id
      WHERE r.room_id = $1
      GROUP BY 
        rt.room_type_id,
        r.room_id,
        ra.room_amenity_id
      ORDER BY 
        r.room_number ASC;`,
      [roomId]
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
    id: newArr.room_id,
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
    room_id: newArr.room_id,
    room_number: newArr.room_number,
    room_type_id: newArr.room_type_id,
    room_status: newArr.room_status,
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
