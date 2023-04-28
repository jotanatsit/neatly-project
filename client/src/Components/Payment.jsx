import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const formdata = {
  roomId: "2",
  roomType: "deluxe",
  currency: "thb",
  price: 2500,
};

const Payment = (props) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const syncStripePromise = async () => {
    const result = await axios.get("http://localhost:4000/payment/config");
    setStripePromise(loadStripe(result.data.publishableKey));
  };

  const syncClientSecret = async () => {
    const result = await axios.post(
      "http://localhost:4000/payment/create-payment-intent",
      formdata,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setClientSecret(result.data.clientSecret);
  };

  useEffect(() => syncStripePromise, []);
  useEffect(() => syncClientSecret, []);

  return (
    <>
      <h1>Payment</h1>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Payment;
