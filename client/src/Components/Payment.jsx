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

  const checkoutData = booking.bookingData;
  const checkoutReq = booking.bookingReq;

  // Create new object that contain booking_request key-value pairs
  const bookingRequest = {
    early_check_in: checkoutData.early_check_in,
    late_check_out: checkoutData.late_check_out,
    non_smoking_room: checkoutData.non_smoking_room,
    a_room_on_the_high_floor: checkoutData.a_room_on_the_high_floor,
    a_quiet_room: checkoutData.a_quiet_room,
    baby_cot: checkoutData.baby_cot,
    airport_transfer: checkoutData.airport_transfer,
    extra_bed: checkoutData.extra_bed,
    extra_pillows: checkoutData.extra_pillows,
    phone_chargers_and_adapters: checkoutData.phone_chargers_and_adapters,
    breakfast: checkoutData.breakfast,
    additional_request: checkoutData.additional_request,
  };

  // Sum value of key in booking_requests - return total price of booking_requests - number
  let totalRequestPrice = 0;
  for (const key in bookingRequest) {
    if (bookingRequest[key] !== null && key !== "additional_request") {
      totalRequestPrice = totalRequestPrice + bookingRequest[key];
    }
  }

  const price_check_out =
    (Number(checkoutData.total_price_per_room) + Number(totalRequestPrice)) *
    Number(checkoutData.amount_rooms) *
    checkoutData.night;

  checkoutData.price_check_out = price_check_out;

  const syncStripePromise = async () => {
    const result = await axios.get("http://localhost:4000/payment/config");
    setStripePromise(loadStripe(result.data.publishableKey));
  };

  const syncClientSecret = async () => {
    const result = await axios.post(
      "http://localhost:4000/payment/create-payment-intent",
      checkoutData,
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

  const appearance = {
    theme: "stripe",
    variables: {
      borderRadius: "4px",
      colorPrimary: "#E76B39",
    },
    rules: {
      ".Tab": {
        border: "1px solid #E4E6ED",
        color: "#9AA1B9",
      },
      ".Tab:hover": {
        border: "1px solid #E76B39",
        color: "#9AA1B9",
      },
      ".Input": {
        border: "1px solid #E4E6ED",
      },
      ".Input::placeholder": {
        color: "#9AA1B9",
      },
      ".Input:focus": {
        border: "1px solid #E76B39",
        boxShadow: "none",
      },
    },
  };

  const options = { clientSecret, appearance };

  return (
    <>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Payment;
