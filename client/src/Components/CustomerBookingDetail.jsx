import React, { useState, useEffect } from "react";
import { Button, Flex, Text, Image, Box, Input } from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../contexts/authentication";

const CustomerBookingDetail = (props) => {
  const userId = useAuth();
  async function customerDetail() {
    try {
      const rs = await axios.get( `http://localhost:4000/booking/${userId.UserIdFromLocalStorage}/${props.user[props.index].booking_detail_id}`);
      console.log(rs.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    customerDetail();
  }, []);

  console.log(props.user[props.index].booking_detail_id);
  

  return (
    <Flex h="1569px" flexDirection="column">
      <Flex w="1200px" h="80px" alignItems="center">
        <Image
          ml={20}
          src="/AdminPage/Vector6.svg"
          onClick={() => props.setShowDetail(false)}
          cursor="pointer"
        ></Image>
        <Text ml={5} textStyle="h5">
          Kate Cho
        </Text>
        <Text ml={5} textStyle="b1">
          Premier Sea View
        </Text>
      </Flex>

      <Flex bg="bg" h="1489px" justifyContent="center">
        <Box
          w="1080px"
          h="1388px"
          bg="white"
          display="flex"
          flexDirection="column"
          mt={55}
        >
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600">
              Customer name
            </Text>
            <Text textStyle="b1">Kate Cho</Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600">
              Guest(s)
            </Text>
            <Text textStyle="b1">2</Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600">
              Room type
            </Text>
            <Text textStyle="b1">Superior Garden View Room</Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600">
              Amount
            </Text>
            <Text textStyle="b1">1 room</Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600">
              Bed type
            </Text>
            <Text textStyle="b1">Single bed</Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600">
              Check-in
            </Text>
            <Text textStyle="b1">Th, 19 Oct 2022</Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600">
              Check-out
            </Text>
            <Text textStyle="b1">Fri, 20 Oct 2022</Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600">
              Stay (total)
            </Text>
            <Text textStyle="b1">1 night</Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600">
              Booking date
            </Text>
            <Text textStyle="b1">Tue, 16 Oct 2022</Text>
          </Box>
          <Flex
            w="920px"
            h="278px"
            bg="gray.100"
            mt={10}
            ml={20}
            flexDirection="column"
            alignItems="center"
          >
            <Box w="872px" h="40px" display="flex" justifyContent="flex-end">
              <Text>Payment success via Credit Card - *888 THB 2,300.00</Text>
            </Box>
            <Box w="872px" h="152px">
              <Box
                w="872px"
                h="48px"
                display="flex"
                justifyContent="space-between"
              >
                <Text>Superior Garden View Room</Text>
                <Text>2,500.00</Text>
              </Box>
              <Box
                w="872px"
                h="48px"
                display="flex"
                justifyContent="space-between"
              >
                <Text>Superior Garden View Room</Text>
                <Text>2,500.00</Text>
              </Box>
              <Box
                w="872px"
                h="48px"
                display="flex"
                justifyContent="space-between"
              >
                <Text>Superior Garden View Room</Text>
                <Text>2,500.00</Text>
              </Box>
            </Box>
            <Box
              w="872px"
              h="54px"
              display="flex"
              justifyContent="space-between"
              alignItems="end"
              borderTop="1px solid"
            >
              <Text>Total</Text>
              <Text>THB 2,300.00</Text>
            </Box>
          </Flex>

          <Flex
            w="920px"
            h="88px"
            flexDirection="column"
            justifyContent="space-evenly"
            bg="gray.300"
            mt={10}
            ml={20}
          >
            <Text ml={5}>Additional Request</Text>
            <Text ml={5}>Can i have some chocolate?</Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CustomerBookingDetail;
