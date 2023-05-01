import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    console.log("creating payment");

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/succeed`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment status:" + paymentIntent.status);
      navigate("/succeed");
    } else {
      setMessage("An unexpected error occured.");
    }

    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message);
    // } else {
    //   setMessage("An unexpected error occured.");
    // }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      {/* <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Confirm Booking"}
        </span>
      </button> */}
      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
      <Flex w="740px" p="40px" justify="space-between">
        <Button variant="ghost">Back</Button>

        <Button
          disabled={isProcessing || !stripe || !elements}
          type="submit"
          id="submit"
          variant="primary"
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Confirm Booking"}
          </span>
        </Button>
      </Flex>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
