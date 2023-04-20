import { Button, Text, Input, Flex } from "@chakra-ui/react";
import Nav_user from "../Components/Nav_user.jsx";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import axios from "axios";

function PaymentMethodPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const userId = useAuth();

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

  useEffect(() => {
    getUserData();
  }, []);

  const formik = useFormik({
    initialValues: {
      card_number: "",
      card_owner: "",
      expire_date: "",
      cvc_cvv: "",
    },
    onSubmit: async (values) => {
      const { card_number, card_owner, expire_date, cvc_cvv } = values;

      const formData = new FormData();
      formData.append("card_number", card_number);
      formData.append("card_owner", card_owner);
      formData.append("expire_date", expire_date);
      formData.append("cvc_cvv", cvc_cvv);

      try {
        const response = await axios.put(
          `http://localhost:4000/profile/${userId.UserIdFromLocalStorage}/payment-method`,
          formData
        );
        console.log(response.data);
        alert(response.data.message);
        navigate("/payment-method");
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      card_number:
        userData.card_number
          ?.replace(/\D/g, "")
          ?.slice(0, 16)
          ?.match(/.{1,4}/g)
          ?.join(" ") || "", // change format card number 16 digit with space XXXX XXXX XXXX XXXX
      card_owner: userData.card_owner || "",
      expire_date: userData.expire_date || "",
      cvc_cvv: userData.cvc_cvv || "",
    });
  }, [userData]);

  return (
    <div>
      <Nav_user />

      <Flex
        bg="#F7F7FB"
        bgSize="cover"
        flexDirection="row"
        justifyContent="center"
        h="100vh"
      >
        <Flex bg="#F7F7FB" mt="80px" flexDirection="column">
          <form onSubmit={formik.handleSubmit}>
            <Flex
              w="930px"
              h="90px"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text textStyle="h2">Payment Method</Text>
              <Button
                w="250px"
                h="48px"
                type="submit"
                variant="primary"
                fontSize="16px"
                fontWeight="600px"
              >
                Update Payment Method
              </Button>
            </Flex>
            <Text textStyle="h5" color="gray.600" mt="100px">
              Credit Card
            </Text>
            <Flex marginTop={10} flexDirection="row" marginBottom={10}>
              <Flex flexDirection="column">
                <label htmlFor="card_number">
                  <Text
                    fontSize={16}
                    fontWeight={400}
                    marginBottom={2}
                    marginRight={3}
                  >
                    Card Number
                  </Text>
                </label>
                <Input
                  id="card_number"
                  name="card_number"
                  type="text"
                  // change format card number 16 digit with space XXXX XXXX XXXX XXXX
                  onChange={(e) => {
                    let { value } = e.target;
                    value = value.replace(/\D/g, "").slice(0, 16);
                    const cardNumber = value.match(/.{1,4}/g)?.join(" ");
                    formik.setFieldValue("card_number", cardNumber || "");
                  }}
                  value={formik.values.card_number}
                  placeholder="Enter your card number"
                  width="441px"
                  bg="#FFFFFF"
                  borderColor="gray.400"
                />
                <label htmlFor="expire_date">
                  <Text
                    fontSize={16}
                    fontWeight={400}
                    marginBottom={2}
                    marginRight={3}
                    marginTop={10}
                  >
                    Expiry Date
                  </Text>
                </label>
                <Input
                  id="expire_date"
                  name="expire_date"
                  type="text"
                  // change format expire date 4 digit with "/" to XX/XX
                  onChange={(e) => {
                    let { value } = e.target;
                    value = value.replace(/\D/g, "").slice(0, 4);
                    if (value.length > 2) {
                      value = value.slice(0, 2) + "/" + value.slice(2);
                    }
                    if (value.length === 2) {
                      value = value + "/";
                    }
                    formik.setFieldValue("expire_date", value);
                  }}
                  value={formik.values.expire_date}
                  placeholder="MM/YY"
                  width="441px"
                  bg="#FFFFFF"
                  borderColor="gray.400"
                  maxLength={5}
                  pattern="\d{2}/\d{2}"
                />
              </Flex>
              <Flex flexDirection="column" marginLeft={12}>
                <label htmlFor="card_owner">
                  <Text
                    fontSize={16}
                    fontWeight={400}
                    marginBottom={2}
                    marginRight={3}
                  >
                    Card Owner
                  </Text>
                </label>
                <Input
                  id="card_owner"
                  name="card_owner"
                  type="card_owner"
                  onChange={formik.handleChange}
                  value={formik.values.card_owner}
                  placeholder="Enter your card name"
                  width="441px"
                  bg="#FFFFFF"
                  borderColor="gray.400"
                />
                <label htmlFor="cvc_cvv">
                  <Text
                    fontSize={16}
                    fontWeight={400}
                    marginBottom={2}
                    marginRight={3}
                    marginTop={10}
                  >
                    CVC/CVV
                  </Text>
                </label>
                <Input
                  id="cvc_cvv"
                  name="cvc_cvv"
                  type="password"
                  // change format CVC/CVV only 3 digit
                  onChange={(e) => {
                    let { value } = e.target;
                    value = value.replace(/\D/g, "").slice(0, 3);
                    formik.setFieldValue("cvc_cvv", value);
                  }}
                  value={formik.values.cvc_cvv}
                  placeholder="CVC/CVV"
                  width="441px"
                  bg="#FFFFFF"
                  borderColor="gray.400"
                />
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </div>
  );
}

export default PaymentMethodPage;
