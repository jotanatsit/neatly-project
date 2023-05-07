import { Router } from "express";
import {
  profilePictureUpload,
  validateProfileData,
} from "../middleware/validateProfileData.js";
import {
  register,
  login,
  registerAdmin,
} from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post(
  "/register",
  profilePictureUpload,
  validateProfileData,
  register
);

authRouter.post("/login", login);

authRouter.post("/register/admin", registerAdmin);

export default authRouter;
