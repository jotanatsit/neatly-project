import { Button, Text, Input, Flex } from "@chakra-ui/react";
import { useFormik } from "formik";
import Nav_user from "../Components/Nav_user.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PaymentMethodPage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      card_number: "",
      card_owner: "",
      expire_date: "",
      cvc_cvv: "",
    },
    // onSubmit: async (values) => {
    //   const { card_number, card_owner, expire_date, cvc_cvv } = values;

    //   const formData = new FormData();
    //   formData.append("card_number", card_number);
    //   formData.append("card_owner", card_owner);
    //   formData.append("expire_date", expire_date);
    //   formData.append("cvc_cvv", cvc_cvv);

    //   try {
    //     const response = await axios.put(
    //       "http://localhost:4000/auth/register",
    //       formData
    //     );
    //     console.error(response.data);
    //     alert(response.data.message);
    //     // navigate("/payment-method");
    //   } catch (error) {
    //     console.error(error);
    //     alert(error.message);
    //   }
    // },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 4));
    },
  });

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
