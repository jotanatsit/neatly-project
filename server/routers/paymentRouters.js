import { Router } from "express";
import { protect } from "../middleware/protect.js";
import {
  createPaymentIntent,
  stripeConfig,
  stripeWebhook,
} from "../controllers/paymentControllers.js";

const paymentRouter = Router();

paymentRouter.post("/create-payment-intent", protect, createPaymentIntent);

paymentRouter.get("/config", stripeConfig);

paymentRouter.post("/webhook", stripeWebhook);

export default paymentRouter;
