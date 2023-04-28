import { Flex, Input, Box, Text, Image } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authentication";
import axios from "axios";
import { useBooking } from "../contexts/booking";

function PaymentCard(props) {
  return (
    <Flex
      justify="center"
      align="center"
      gap="8px"
      w="212px"
      h="80px"
      boxShadow="neatly"
      border="1px solid"
      borderColor={props.borderColor}
      borderRadius="4px"
    >
      <Image
        boxSize="32px"
        src={`/BookingSummaryPage/${props.icon}-${props.iconColor}.svg`}
      />
      <Text textStyle="h5" color={props.color}>
        {props.children}
      </Text>
    </Flex>
  );
}
function PaymentMethod() {
  const [userData, setUserData] = useState({});
  const userId = useAuth();
  let bookingData = useBooking();

  async function getUserData() {
    try {
      const response = await axios.get(
        `http://localhost:4000/profile/${userId.UserIdFromLocalStorage}/payment-method`
      );
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  bookingData = {
    user_id: userId.UserIdFromLocalStorage,
    ...bookingData,
    ...userData,
  };
  console.log(bookingData);

  useEffect(() => {
    getUserData();
  }, []);

  const formik = useFormik({
    initialValues: {
      card_number: userData.card_number,
      card_owner: userData.card_owner,
      expire_date: userData.expire_date,
      cvc_cvv: userData.cvc_cvv,
    },
    onSubmit: {},
  });

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      card_number: userData.card_number
        ?.replace(/\D/g, "")
        ?.slice(0, 16)
        ?.match(/.{1,4}/g)
        ?.join(" "), // change format card number 16 digit with space XXXX XXXX XXXX XXXX
      card_owner: userData.card_owner,
      expire_date: userData.expire_date,
      cvc_cvv: userData.cvc_cvv,
    });
  }, [userData]);

  return (
    <Flex
      direction="column"
      w="740px"
      gap="40px"
      padding="40px"
      bg="white"
      border="1px solid"
      borderBottom="none"
      borderColor="gray.300"
      borderTopRadius="4px"
    >
      <Flex w="100%" justify="space-between">
        <PaymentCard
          icon="credit"
          iconColor="orange"
          color="orange.500"
          borderColor="orange.500"
        >
          Credit Card
        </PaymentCard>
        <PaymentCard
          icon="cash"
          iconColor="gray"
          color="gray.600"
          borderColor="gray.300"
        >
          Cash
        </PaymentCard>
        <PaymentCard
          icon="cheque"
          iconColor="gray"
          color="gray.600"
          borderColor="gray.300"
        >
          Cheque
        </PaymentCard>
      </Flex>
      <form onSubmit={formik.handleSubmit}>
        <Flex direction="column" gap="40px">
          <Text textStyle="h5" color="gray.600">
            Credit Card
          </Text>
          <Box gap="4px">
            <label htmlFor="card_number">
              <Text textStyle="b1" color="gray.900">
                Card Number
              </Text>
            </label>
            <Input
              id="card_number"
              name="card_number"
              type="text"
              value={formik.values.card_number}
            />
          </Box>
          <Box gap="4px">
            <label htmlFor="card_owner">
              <Text textStyle="b1" color="gray.900">
                Card Owner
              </Text>
            </label>
            <Input
              id="card_owner"
              name="card_owner"
              type="card_owner"
              value={formik.values.card_owner}
            />
          </Box>
          <Flex gap="40px">
            <Box w="310px" gap="4px">
              <label htmlFor="expire_date">
                <Text textStyle="b1" color="gray.900">
                  Expiry Date
                </Text>
              </label>
              <Input
                id="expire_date"
                name="expire_date"
                type="text"
                value={formik.values.expire_date}
                pattern="\d{2}/\d{2}"
              />
            </Box>
            <Box w="310px" gap="4px">
              <label htmlFor="cvc_cvv">
                <Text textStyle="b1" color="gray.900">
                  CVC/CVV
                </Text>
              </label>
              <Input
                id="cvc_cvv"
                name="cvc_cvv"
                type="password"
                value={formik.values.cvc_cvv}
              />
            </Box>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}
export default PaymentMethod;
