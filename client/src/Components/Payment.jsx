import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useBooking } from "../contexts/booking";

const Payment = (props) => {
  const booking = useBooking(); // ข้อมูลเป็น object ที่จะถูกส่งไป database
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  console.log(booking.bookingData);

  const syncStripePromise = async () => {
    const result = await axios.get("http://localhost:4000/payment/config");
    setStripePromise(loadStripe(result.data.publishableKey));
  };

  const syncClientSecret = async () => {
    const result = await axios.post(
      "http://localhost:4000/payment/create-payment-intent",
      booking.bookingData,
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
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Payment;
