import { Router } from "express";
import {
  profilePictureUpload,
  validateProfileData,
} from "../middleware/validateProfileData.js";
import { protect } from "../middleware/protect.js";
import {
  getUserProfile,
  updateUserProfile,
  getPaymentMethod,
  updatePaymentMethod,
} from "../controllers/profileControllers.js";

const profileRouter = Router();

profileRouter.use(protect);

profileRouter.get("/:id", getUserProfile);

profileRouter.put(
  "/:id",
  profilePictureUpload,
  validateProfileData,
  updateUserProfile
);

profileRouter.get("/:id/payment-method", getPaymentMethod);

// ------------------------------------- update payment method data to database -------------------------------------------

profileRouter.put(
  "/:id/payment-method",
  profilePictureUpload,
  validateProfileData,
  updatePaymentMethod
);

export default profileRouter;
