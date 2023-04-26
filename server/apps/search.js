import { Router } from "express";
import { pool } from "../utils/db.js";

const searchRouter = Router();

searchRouter.get("/", async (req, res) => {
  const check_in_date = req.query.check_in_date;
  const check_out_date = req.query.check_out_date;
  const amount_guests = req.query.amount_guests;

  try {
    // get booking data // assume: amount_guests = 2
    const table1 = await pool.query(
      `select booking.room_id, booking.check_in_date, booking.check_out_date, rooms.room_type_id ,rooms_type.amount_person
        from booking
        inner join rooms
        ON booking.room_id = rooms.room_id
        inner join rooms_type
        ON rooms.room_type_id = rooms_type.room_type_id
        where rooms_type.amount_person = $1`,
      [amount_guests]
    );

    // Unavailable rooms at check_date - array - [ 5, 10 ]
    const unavailableRooms = table1.rows
      .filter((row) => {
        return (
          check_in_date < row.check_out_date &&
          check_out_date > row.check_in_date
        );
      })
      .map((row) => row.room_id);

    const table2 = await pool.query(
      `select rooms.room_id, rooms.room_type_id ,rooms_type.amount_person
        from rooms
        inner join rooms_type
        ON rooms.room_type_id = rooms_type.room_type_id
        where rooms_type.amount_person = $1`,
      [amount_guests]
    );

    // All rooms in the same rooms_type - array - [ 5, 6, 7, 8, 9, 10, 11, 12, 17, 18, 19, 20 ]
    const allRooms = table2.rows.map((room) => room.room_id);

    // Available rooms at check_date - array - [ 6, 7, 8, 9, 11, 12, 17, 18, 19, 20 ]
    const availableRoom = allRooms.filter(
      (room) => !unavailableRooms.includes(room)
    );

    // Turn available room_id to room_type_id - array - [ 2, 2, 2, 3, 3, 3, 5, 5, 6, 6 ]
    const availableRoomType = table2.rows
      .filter((room) => availableRoom.includes(room.room_id))
      .map((room) => room.room_type_id);

    // Count rooms reference room_type_id - array - [ [ 2, 3 ], [ 3, 3 ], [ 5, 2 ], [ 6, 2 ] ]
    const roomsTypeForBooking = Object.entries(
      availableRoomType.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {})
    ).map(([key, value]) => [parseInt(key), value]);

    // Available rooms_type data for booking - array
    const roomsTypeData = [];
    for (let i = 0; i < roomsTypeForBooking.length; i++) {
      const results = await pool.query(
        `SELECT 
          rt.*, 
          array_agg(rp.room_picture) as room_picture       
        FROM rooms_type rt
        LEFT JOIN rooms_pictures rp ON rp.room_type_id = rt.room_type_id
        WHERE rt.room_type_id = $1
        GROUP BY 
          rt.room_type_id
        ORDER BY 
          rt.room_type_id ASC;`,
        [roomsTypeForBooking[i][0]]
      );

      results.rows[i] = {
        ...results.rows[i],
        available_room: roomsTypeForBooking[i][1],
      };

      roomsTypeData.push(results.rows);
    }

    return res.status(200).json({ data: roomsTypeData });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

export default searchRouter;
