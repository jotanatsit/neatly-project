import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Flex, Text, Button, Spinner } from "@chakra-ui/react";
import { useBooking } from "../contexts/booking";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { step, setStepPayment } = useBooking();

  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  function backStep() {
    if (step[2] === "current") {
      setStepPayment(["finish", "current", "none"]);
    } else if (step[1] === "current") {
      setStepPayment(["current", "none", "none"]);
    }
  }

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
        return_url: `${window.location.origin}/processing`,
      },
      // redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment status:" + paymentIntent.status);
      // navigate("/succeed");
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <Flex direction="column" align="center">
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
          <Button variant="ghost" onClick={backStep}>
            Back
          </Button>

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
      {isProcessing ? (
        <Flex m="40px">
          <Spinner
            color="orange.500"
            thickness="5px"
            emptyColor="gray.300"
            h="120px"
            w="120px"
          />
        </Flex>
      ) : null}
    </Flex>
  );
}
