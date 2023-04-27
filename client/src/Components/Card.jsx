import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const Card = () => {
  const elements = useElements();
  const stripe = useStripe();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    console.log("creating payment");

    const result = await axios.post(
      "http://localhost:4000/payment/create-payment-intent",
      { paymentMethod: "card", currency: "thb", roomType: "deluxe" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const clientSecret = result.data.clientSecret;

    console.log("payment intent created");

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      console.log(error.message);
      return;
    }

    console.log(`PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`);
  };
  return (
    <div>
      <h1>Card</h1>
      <form id="payment-form" onSubmit={handleSubmit}>
        <label htmlFor="card-element">Card</label>
        <CardElement id="card-element" />
        <button>Pay</button>
      </form>
    </div>
  );
};

export default Card;
