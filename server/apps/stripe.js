import { Router } from "express";
import { pool } from "../utils/db.js";
import Stripe from "stripe";
import { protect } from "../middleware/protect.js";
import dotenv from "dotenv";

dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const paymentRouter = Router();

paymentRouter.post("/create-payment-intent", protect, async (req, res) => {
  try {
    const data = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.price * 100,
      currency: data.currency,
      metadata: data,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(400).json({ error: { message: err.message } });
  }
});

paymentRouter.get("/config", async (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

paymentRouter.post("/webhook", async (req, res) => {
  let data, eventType, eventId;
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    let event;
    const sig = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`Error messsage: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    data = event.data;
    eventType = event.type;
    eventId = event.id;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // we can retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  // Handle the event
  //   console.log(`Unhandled event type ${event.type}`);

  if (eventType === "payment_intent.created") {
    const paymentIntent = data.object;

    console.log(
      `[${eventId}] PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`
    );
  }
  if (eventType === "payment_intent.succeeded") {
    // Funds have been captured
    // Fulfill any orders, e-mail receipts, etc
    // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
    const checkOutData = data.object.metadata;
    console.log(checkOutData);
    console.log("💰 Payment captured!");
  } else if (eventType === "payment_intent.payment_failed") {
    console.log("❌ Payment failed.");
  } else if (eventType === "payment)_intent.refund") {
  }
  res.sendStatus(200);
  // Return a 200 response to acknowledge receipt of the event
  // res.send({ received: true });
});

export default paymentRouter;
