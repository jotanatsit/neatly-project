import { Router } from "express";
import {
  maximumSearch,
  getRoomTypeBySearch,
  getRoomType,
  getRoomTypeById,
  editRoomPrice,
  getAllRoom,
  editRoomStatus,
} from "../controllers/roomControllers.js";

const roomRouter = Router();

// ----------------------------- get maximum guests for 1 room & maximum rooms in 1 room_type ---------------------------------

roomRouter.get("/room-type/max-guests", maximumSearch);

// ------------------------- get room type by search (get guest more than amount search) ------------------------------

roomRouter.get("/room-type/search", getRoomTypeBySearch);

// ------------------------------------------- get all rooms type -------------------------------------------

roomRouter.get("/room-type", getRoomType);

// ------------------------------------------- get room type by type id -------------------------------------------

roomRouter.get("/room-type/:id", getRoomTypeById);

// ------------------------------ edit price and promotion_price by room type id --------------------------------

roomRouter.put("/room-type/:id", editRoomPrice);

// ------------------------------------------- get all rooms -------------------------------------------

roomRouter.get("/", getAllRoom);

// ------------------------------------------- api for change room status -------------------------------------------

roomRouter.put("/:roomId", editRoomStatus);

export default roomRouter;
