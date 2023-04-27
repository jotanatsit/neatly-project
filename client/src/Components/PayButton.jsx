import axios from "axios";
import { Button, Box } from "@chakra-ui/react";

const PayButton = () => {
  const handdleCheckout = () => {
    axios
      .post("http://localhost:4000/payment/create-checkout-session", {
        user: "test",
        room: "test-room",
      })
      .then((res) => {
        console.log(res.data.url);
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <Box>
      <Button onClick={() => handdleCheckout()}>Check Out</Button>
    </Box>
  );
};

export default PayButton;
