import { Flex, Text, Input, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authentication.jsx";
import axios from "axios";
import React from "react";
import { useBooking } from "../contexts/booking.jsx";
import changeFormatDate from "../utils/changeFormatDate";

function BasicInfoSummary() {
  const [userData, setUserData] = useState({});
  const { resetBookingRequests } = useBooking();
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

  const birthDate = changeFormatDate(new Date(userData.birth_date));

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Flex gap="24px">
      <Flex
        direction="column"
        bg="white"
        w="740px"
        p="40px"
        gap="40px"
        border="1px solid"
        borderBottom="none"
        borderColor="gray.300"
        borderTopRadius="4px"
      >
        <Text textStyle="h5" color="gray.600">
          Basic Information
        </Text>
        <Box gap="4px">
          <Text textStyle="b1" color="gray.900">
            Full Name
          </Text>
          <Text
            textStyle="b1"
            color="black"
            p="12px 16px 12px 12px"
            border="1px solid"
            borderColor="gray.400"
            borderRadius="4px"
          >
            {userData.fullname}
          </Text>
        </Box>
        <Box gap="4px">
          <Text textStyle="b1" color="gray.900">
            Email
          </Text>
          <Text
            textStyle="b1"
            color="black"
            p="12px 16px 12px 12px"
            border="1px solid"
            borderColor="gray.400"
            borderRadius="4px"
          >
            {userData.email}
          </Text>
        </Box>
        <Box gap="4px">
          <Text textStyle="b1" color="gray.900">
            ID Number
          </Text>
          <Text
            textStyle="b1"
            color="black"
            p="12px 16px 12px 12px"
            border="1px solid"
            borderColor="gray.400"
            borderRadius="4px"
          >
            {userData.id_number?.replace(
              /^(\d{1})(\d{4})(\d{5})(\d{2})(\d{0,1})/,
              "$1 $2 $3 $4 $5"
            )}
          </Text>
        </Box>
        <Box gap="4px">
          <Text textStyle="b1" color="gray.900">
            Date of Birth
          </Text>
          <Text
            textStyle="b1"
            color="black"
            p="12px 16px 12px 12px"
            border="1px solid"
            borderColor="gray.400"
            borderRadius="4px"
          >
            {birthDate}
          </Text>
        </Box>
        <Box gap="4px">
          <Text textStyle="b1" color="gray.900">
            Country
          </Text>
          <Text
            textStyle="b1"
            color="black"
            p="12px 16px 12px 12px"
            border="1px solid"
            borderColor="gray.400"
            borderRadius="4px"
          >
            {userData.country}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default BasicInfoSummary;
