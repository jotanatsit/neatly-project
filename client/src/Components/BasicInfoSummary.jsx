import { Flex, Text, Input, Box, Select, Button } from "@chakra-ui/react";
import OptionCountry from "../Components/SelectCountry.jsx";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authentication";
import axios from "axios";

function BasicInfoSummary() {
  const [userData, setUserData] = useState({});
  const userId = useAuth();
  async function getUserData() {
    try {
      const response = await axios.get(
        `http://localhost:4000/profile/${userId.UserIdFromLocalStorage}`
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
      fullname: userData.fullname,
      email: userData.email,
      id_number: userData.id_number,
      birth_date: userData.birth_date,
      country: userData.country,
    },
    onSubmit: {},
  });
  useEffect(() => {
    formik.setValues({
      ...formik.values,
      fullname: userData.fullname,
      email: userData.email,
      id_number: userData.id_number?.replace(
        /^(\d{1})(\d{4})(\d{5})(\d{2})(\d{0,1})/,
        "$1-$2-$3-$4-$5"
      ),
      birth_date: userData.birth_date,
      country: userData.country,
    });
  }, [userData]);

  return (
    <Flex gap="24px">
      <form onSubmit={formik.handleSubmit}>
        <Flex
          direction="column"
          bg="white"
          w="740px"
          p="40px"
          gap="40px"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="4px"
        >
          <Text textStyle="h5" color="gray.600">
            Basic Information
          </Text>
          <Box gap="4px">
            <label htmlFor="fullname">
              <Text textStyle="b1" color="gray.900">
                Full Name
              </Text>
              <Input
                id="fullname"
                name="fullname"
                type="fullname"
                value={formik.values.fullname}
              />
            </label>
          </Box>
          <Box gap="4px">
            <label htmlFor="email">
              <Text textStyle="b1" color="gray.900">
                Email
              </Text>
              <Input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
              />
            </label>
          </Box>
          <Box gap="4px">
            <label htmlFor="id_number">
              <Text textStyle="b1" color="gray.900">
                ID Number
              </Text>
              <Input
                id="id_number"
                name="id_number"
                type="tel"
                value={formik.values.id_number}
                pattern="[0-9]{1}-[0-9]{4}-[0-9]{5}-[0-9]{2}-[0-9]{1}"
              />
            </label>
          </Box>
          <Box gap="4px">
            <label htmlFor="birth_date">
              <Text textStyle="b1" color="gray.900">
                Date of Birth
              </Text>
              <Input
                id="birth_date"
                name="birth_date"
                type="date"
                value={formik.values.birth_date}
                color={formik.values.birth_date ? "gray.800" : "gray.500"}
              />
            </label>
          </Box>
          <Box gap="4px">
            <label htmlFor="country">
              <Text textStyle="b1" color="gray.900">
                Country
              </Text>
              <Select
                id="country"
                name="country"
                colorScheme="gray.800"
                value={formik.values.country}
                color={formik.values.country ? "gray.800" : "gray.500"}
              >
                <OptionCountry />
              </Select>
            </label>
          </Box>
          <Flex w="100%" justify="space-between">
            <Button variant="ghost">Back</Button>
            <Button type="submit" variant="primary">
              Next
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}

export default BasicInfoSummary;
