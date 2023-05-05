import React, { useState, useEffect } from "react";
import { Button, Flex, Text, Image, Box, Input } from "@chakra-ui/react";
import axios from "axios";

const CustomerBookingDetail = (props) => {
  const [userBooking, setUserBooking] = useState({});

  async function customerDetail() {
    try {
      const rs = await axios.get(
        `http://localhost:4000/booking/${props.userID}/${props.index}`
      );
      console.log(rs.data.data);
      setUserBooking(rs.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    customerDetail();
  }, []);

  return (
    <Flex h="1569px" flexDirection="column">
      <Flex w="1200px" h="80px" alignItems="center">
        <Image
          ml={20}
          src="/AdminPage/Vector6.svg"
          onClick={() => props.setShowDetail(false)}
          cursor="pointer"
        ></Image>
        <Text ml={5} textStyle="h5" color="black">
          {userBooking.fullname}
        </Text>
        <Text ml={5} textStyle="b1" color="black">
          {userBooking.room_type_name}
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
            <Text textStyle="b1" color="black">
              {userBooking.room_type_name}
            </Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600">
              Guest(s)
            </Text>
            <Text textStyle="b1" color="black">
              {userBooking.amount_guests}
            </Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600">
              Room type
            </Text>
            <Text textStyle="b1" color="black">
              {userBooking.room_type_name}
            </Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600">
              Amount
            </Text>
            <Text textStyle="b1" color="black">
              {userBooking.amount_rooms} room
            </Text>
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
            <Text textStyle="b1" color="black">
              {new Date(userBooking.check_in_date).toLocaleDateString("en-US", {
                day: "numeric",
                weekday: "short",
                year: "numeric",
                month: "long",
              })}
            </Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600">
              Check-out
            </Text>
            <Text textStyle="b1" color="black">
              {new Date(userBooking.check_out_date).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  weekday: "short",
                  year: "numeric",
                  month: "long",
                }
              )}
            </Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600">
              Stay (total)
            </Text>
            <Text textStyle="b1" color="black">
              {Math.ceil(
                (new Date(userBooking.check_out_date) -
                  new Date(userBooking.check_in_date)) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              night
            </Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600">
              Booking date
            </Text>
            <Text textStyle="b1" color="black">
              {new Date(userBooking.booking_date).toLocaleDateString("en-US", {
                day: "numeric",
                weekday: "short",
                year: "numeric",
                month: "long",
              })}
            </Text>
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
              <Text>Payment success via {userBooking.payment_type}</Text>
            </Box>
            <Box w="872px" h="152px">
              <Box
                w="872px"
                h="48px"
                display="flex"
                justifyContent="space-between"
              >
                <Text color="black">{userBooking.room_type_name}</Text>
                <Text color="black">{userBooking.price}</Text>
              </Box>
              <Box
                w="872px"
                h="48px"
                display="flex"
                justifyContent="space-between"
              >
                <Text textStyle="b1" color="black">
                  Superior Garden View Room
                </Text>
                <Text textStyle="b1" color="black" fontWeight="600">
                  2,500.00
                </Text>
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
              <Text textStyle="b1" color="black">
                Total
              </Text>
              <Text textStyle="b1" color="black" fontWeight="600">
                THB 2,300.00
              </Text>
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
