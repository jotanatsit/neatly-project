import {
  Button,
  Text,
  Input,
  Select,
  Flex,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import OptionCountry from "../Components/SelectCountry.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Nav_nonuser from "../Components/Nav_nonuser.jsx";

function RegisterPage() {
  const navigate = useNavigate();
  const [checkPicture, setCheckPicture] = useState(null);
  const [fileInputKey, setFileInputKey] = useState("");

  // form submit by formik
  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      id_number: "",
      birth_date: "",
      country: "",
      card_number: "",
      card_owner: "",
      expire_date: "",
      cvc_cvv: "",
      profile_picture: null,
    },
    onSubmit: async (values) => {
      const {
        fullname,
        username,
        email,
        password,
        id_number,
        birth_date,
        country,
        card_number,
        card_owner,
        expire_date,
        cvc_cvv,
      } = values;

      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("id_number", id_number);
      formData.append("birth_date", birth_date);
      formData.append("country", country);
      formData.append("card_number", card_number);
      formData.append("card_owner", card_owner);
      formData.append("expire_date", expire_date);
      formData.append("cvc_cvv", cvc_cvv);
      formData.append("profile_picture", values.profile_picture);

      // send request post value to server
      try {
        const response = await axios.post(
          "http://localhost:4000/auth/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert(response.data.message);
        navigate("/login");
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    },
  });

  // function set format Id Number 13 digit with X-XXXX-XXXXX-XX-X
  const handleIdNumberChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, "");

    if (value.length > 0 && value.length <= 1) {
      value = value.replace(/^(\d{1})/, "$1-");
    } else if (value.length > 1 && value.length <= 5) {
      value = value.replace(/^(\d{1})(\d{0,4})/, "$1-$2");
    } else if (value.length > 5 && value.length <= 10) {
      value = value.replace(/^(\d{1})(\d{4})(\d{0,5})/, "$1-$2-$3");
    } else if (value.length > 10 && value.length <= 12) {
      value = value.replace(/^(\d{1})(\d{4})(\d{5})(\d{0,2})/, "$1-$2-$3-$4");
    } else if (value.length > 12) {
      value = value.replace(
        /^(\d{1})(\d{4})(\d{5})(\d{2})(\d{0,1})/,
        "$1-$2-$3-$4-$5"
      );
    }

    formik.setFieldValue("id_number", value);
  };

  // function remove picture profile for changing to new picture
  const handleRemoveImage = (event) => {
    event.preventDefault();
    formik.setFieldValue("profile_picture", null);
    setCheckPicture(null);
    setFileInputKey(Date.now());
  };

  return (
    <Flex w="1440px" m="auto" flexDirection="column" alignItems="center">
      <Box position="fixed" zIndex="10">
        <Nav_nonuser />
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Flex
          height={1800}
          w="1440px"
          bg="url('/RegisterPage/background.svg')"
          bgSize="cover"
          flexDirection="row"
          justifyContent="center"
          mt="100px"
        >
          <Flex
            margin={20}
            bg="#F7F7FB"
            width={850}
            height={1626}
            borderRadius={4}
            flexDirection="column"
          >
            <Flex paddingLeft={20} paddingTop={20}>
              <Text textStyle="h2">Register</Text>
            </Flex>

            <Flex marginTop={20} marginLeft={20} marginBottom={10}>
              <Text fontSize={20} fontWeight={600} color="gray.600">
                Basic Information
              </Text>
            </Flex>

            <Flex paddingLeft={20} flexDirection="column">
              <label htmlFor="fullname">
                <Text fontSize={16} fontWeight={400} marginBottom={2}>
                  Full Name
                </Text>
              </label>
              <Spacer />
              <Input
                id="fullname"
                name="fullname"
                type="fullname"
                onChange={formik.handleChange}
                value={formik.values.fullname}
                placeholder="Enter your name and last name"
                width={687}
                bg="#FFFFFF"
                borderColor="gray.400"
              />

              <Flex marginTop={10} flexDirection="row">
                <Flex flexDirection="column" marginRight={19}>
                  <label htmlFor="username">
                    <Text
                      fontSize={16}
                      fontWeight={400}
                      marginBottom={2}
                      marginRight={3}
                    >
                      Username
                    </Text>
                  </label>
                  <Input
                    id="username"
                    name="username"
                    type="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="Enter your username"
                    width={320}
                    bg="#FFFFFF"
                    borderColor="gray.400"
                  />
                  <label htmlFor="password">
                    <Text
                      fontSize={16}
                      fontWeight={400}
                      marginBottom={2}
                      marginRight={3}
                      marginTop={10}
                    >
                      Password
                    </Text>
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Enter your password"
                    width={320}
                    bg="#FFFFFF"
                    borderColor="gray.400"
                  />
                  <label htmlFor="birth_date">
                    <Text
                      fontSize={16}
                      fontWeight={400}
                      marginBottom={2}
                      marginRight={3}
                      marginTop={10}
                    >
                      Date of Birth
                    </Text>
                  </label>
                  <Input
                    id="birth_date"
                    name="birth_date"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.birth_date}
                    placeholder="Select your date of birth"
                    max={new Date(
                      new Date().getFullYear() - 18,
                      new Date().getMonth(),
                      new Date().getDate()
                    )
                      .toISOString()
                      .slice(0, 10)}
                    width={320}
                    bg="#FFFFFF"
                    borderColor="gray.400"
                    color={formik.values.birth_date ? "gray.800" : "gray.500"}
                  />
                </Flex>

                <Flex flexDirection="column" marginLeft={7}>
                  <label htmlFor="email">
                    <Text
                      fontSize={16}
                      fontWeight={400}
                      marginBottom={2}
                      marginRight={3}
                    >
                      Email
                    </Text>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Enter your email"
                    width={320}
                    bg="#FFFFFF"
                    borderColor="gray.400"
                  />
                  <label htmlFor="id_number">
                    <Text
                      fontSize={16}
                      fontWeight={400}
                      marginBottom={2}
                      marginRight={3}
                      marginTop={10}
                    >
                      ID Number
                    </Text>
                  </label>
                  <Input
                    id="id_number"
                    name="id_number"
                    type="tel"
                    onChange={handleIdNumberChange}
                    value={formik.values.id_number}
                    placeholder="Enter your ID Number"
                    width={320}
                    bg="#FFFFFF"
                    borderColor="gray.400"
                    maxLength={17}
                    minLength={17}
                    pattern="[0-9]{1}-[0-9]{4}-[0-9]{5}-[0-9]{2}-[0-9]{1}"
                  />
                  <label htmlFor="country">
                    <Text
                      fontSize={16}
                      fontWeight={400}
                      marginBottom={2}
                      marginRight={3}
                      marginTop={10}
                    >
                      Country
                    </Text>
                  </label>

                  <Select
                    id="country"
                    name="country"
                    onChange={formik.handleChange}
                    value={formik.values.country}
                    placeholder="Select your country"
                    width={320}
                    bg="#FFFFFF"
                    borderColor="gray.400"
                    _focus={{
                      borderColor: "orange.400",
                      outlineStyle: "none",
                      color: "gray.800",
                      boxShadow: "none",
                    }}
                    colorScheme="gray.800"
                    // normally show color gray.500, if have event color show gray.800
                    color={formik.values.country ? "gray.800" : "gray.500"}
                    style={{
                      paddingLeft: "15px",
                      paddingTop: "9px",
                      paddingBottom: "12px",
                    }}
                    fontSize="16px"
                  >
                    <OptionCountry />
                  </Select>
                </Flex>
              </Flex>

              {/* Upload file image */}
              <Flex marginTop={20} flexDirection="column">
                <Text
                  fontSize={20}
                  fontWeight={600}
                  color="gray.600"
                  marginBottom={10}
                >
                  Profile Picture
                </Text>
                <Flex
                  width={167}
                  height={167}
                  bg="#F1F2F6"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius={4}
                >
                  <input
                    key={fileInputKey}
                    id="file-upload"
                    name="image"
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(event) => {
                      formik.setFieldValue(
                        "profile_picture",
                        event.target.files[0]
                      );
                      setCheckPicture(event.target.files[0]);
                    }}
                  />

                  {/* ถ้าไม่มี picture ก็จะโชว์ช่อง input : ถ้ามี picture ก็จะโชว์ picture พร้อม delete buton  */}
                  {checkPicture === null ? (
                    <label htmlFor="file-upload">
                      <Text color="orange.500" fontSize={30} textAlign="center">
                        +
                      </Text>
                      <Text color="orange.500" fontSize={14} fontStyle="medium">
                        Upload photo
                      </Text>
                    </label>
                  ) : (
                    <Flex position="relative">
                      <img
                        src={URL.createObjectURL(checkPicture)}
                        alt={checkPicture.name}
                      />
                      <Button
                        onClick={(event) => handleRemoveImage(event)}
                        color="#FFFFFF"
                        bg="orange.600"
                        borderRadius="full"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        paddingLeft={1.0}
                        paddingRight={1.0}
                        paddingTop={0.25}
                        paddingBottom={0.25}
                        position="absolute"
                        right={-3.0}
                        top={-2.5}
                        size="xs"
                        _hover={{ bg: "orange.500", color: "white" }}
                        _focus={{ bg: "orange.700", color: "white" }}
                      >
                        x
                      </Button>
                    </Flex>
                  )}
                </Flex>
              </Flex>

              <Text
                fontSize={20}
                fontWeight={600}
                color="gray.600"
                marginTop={20}
              >
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
                    width={320}
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
                    width={320}
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
                    width={320}
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
                    width={320}
                    bg="#FFFFFF"
                    borderColor="gray.400"
                  />
                </Flex>
              </Flex>
            </Flex>

            <Flex marginLeft={20} marginTop={19} flexDirection="column">
              <Button type="submit" variant="primary" width={320}>
                Register
              </Button>
              <Flex flexDirection="row" marginTop={10} gap={3}>
                <Text color="gray.700">Already have an account?</Text>
                <Text color="orange.500" fontWeight={600}>
                  <Link to="/login">Login</Link>
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}

export default RegisterPage;
