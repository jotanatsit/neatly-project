import { Router } from "express";
import { protect } from "../middleware/protect.js";
import {
  getAllbookingForAdmin,
  getUserById,
  getAllUser,
  updateCheckInOut,
  deleteBooking,
} from "../controllers/bookingControllers.js";

const bookingRouter = Router();

// bookingRouter.use(protect);

// ------------------------------------------- get all booking for admin -------------------------------------------

bookingRouter.get("/", getAllbookingForAdmin);

// ------------------------------------------- get all user's booking -------------------------------------------

bookingRouter.get("/:userId", getAllUser);

// ------------------------------------------- get one user's booking by id -------------------------------------------

bookingRouter.get("/:userId/:bookingDetailId", getUserById);

// ------------------------------------------- update check_in & check_out date -------------------------------------------

bookingRouter.put("/:userId/:bookingDetailId", updateCheckInOut);

// ------------------------------------------- delete - update cancellation_date -------------------------------------------

bookingRouter.delete("/:userId/:bookingDetailId", deleteBooking);

export default bookingRouter;
