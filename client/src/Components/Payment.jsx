import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const Payment = (props) => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect();
  return <div>Payment</div>;
};

export default Payment;
