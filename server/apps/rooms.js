import { Router } from "express";
import { pool } from "../utils/db.js";

const roomRouter = Router();

//create api get rooms data
roomRouter.get("/", async (req, res) => {
  const results = await pool.query(
    `SELECT 
        r.*,
        ra.*,
        array_agg(rp.room_picture) as room_picture        
    FROM rooms r
    LEFT JOIN room_pictures rp ON rp.room_id = r.room_id
    LEFT JOIN rooms_amenities ra ON ra.room_amenity_id = r.room_id
    GROUP BY 
        r.room_id, 
        ra.room_amenity_id
    ORDER BY 
        r.room_number ASC;`
  );

  return res.json({
    data: results.rows,
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
        ra.*,
        array_agg(rp.room_picture) as room_picture        
      FROM rooms r
      LEFT JOIN room_pictures rp ON rp.room_id = r.room_id
      LEFT JOIN rooms_amenities ra ON ra.room_amenity_id = r.room_id
      WHERE r.room_id = $1
      GROUP BY 
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

  return res.json({
    data: result?.rows?.[0] ?? [],
  });
});

export default roomRouter;
