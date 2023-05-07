import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import axios from "axios";

const CustomerBookingDetail = (props) => {
  const [userBooking, setUserBooking] = useState({});

  async function customerDetail() {
    try {
      const rs = await axios.get(
        `http://localhost:4000/booking/${props.userID}/${props.index}`
      );

      setUserBooking(rs.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    customerDetail();
  }, []);

  return (
    <Flex h="auto" flexDirection="column">
      <Flex w="1200px" h="80px" alignItems="center">
        <Image
          ml={20}
          src="/AdminPage/Vector6.svg"
          onClick={() => props.setShowDetail(false)}
          cursor="pointer"
        ></Image>
        <Text ml={5} textStyle="h5">
          {userBooking.username}
        </Text>
        <Text ml={5} textStyle="b1" fontWeight="400">
          {userBooking.room_type_name}
        </Text>
      </Flex>

      <Flex
        bg="bg"
        height="889px"
        justifyContent="center"
        pb={20}
        overflow="scroll"
        overflowX="hidden"
      >
        <Box
          w="1080px"
          h="1400px"
          border="1px solid"
          bg="white"
          pb={20}
          display="flex"
          flexDirection="column"
          mt={55}
        >
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600" mb={2}>
              Customer name
            </Text>
            <Text textStyle="b1">{userBooking.fullname}</Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600" mb={2}>
              Guest(s)
            </Text>
            <Text textStyle="b1" color="black">
              {userBooking.amount_guests}
            </Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600" mb={2}>
              Room type
            </Text>
            <Text textStyle="b1" color="black">
              {userBooking.room_type_name}
            </Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600" mb={2}>
              Amount
            </Text>
            <Text textStyle="b1" color="black">
              {userBooking.amount_rooms} room
            </Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600" mb={2}>
              Bed type
            </Text>
            <Text textStyle="b1" color="black">
              {userBooking.bed_type}
            </Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600" mb={2}>
              Check-in
            </Text>
            <Text textStyle="b1" color="black">
              {userBooking.check_in_date}
            </Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600" mb={2}>
              Check-out
            </Text>
            <Text textStyle="b1" color="black">
              {userBooking.check_out_date}
            </Text>
          </Box>
          <Box w="880px" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600" mb={2}>
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
            <Text textStyle="h5" color="gray.600" mb={2}>
              Booking date
            </Text>
            <Text textStyle="b1" color="black">
              {userBooking.booking_date}
            </Text>
          </Box>

          {/* <Flex
            w="920px"
            h="auto"
            bg="gray.100"
            mt={10}
            ml={20}
            flexDirection="column"
            alignItems="center"
            overflow="scroll"
          >
            <Box
              w="872px"
              h="40px"
              display="flex"
              justifyContent="flex-end"
              mt={5}
            >
              <Text textStyle="b1" fontWeight="400" color="gray.600">
                Payment success via
              </Text>
              <Text ml={2} textStyle="b1" fontWeight="600" color="gray.600">
                {userBooking.payment_type}
              </Text>
            </Box>
            <Box w="872px" h="auto">
              <Box
                w="872px"
                h="48px"
                display="flex"
                justifyContent="space-between"
              >
                <Text textStyle="b1" color="black">
                  {userBooking.room_type_name}
                </Text>
                <Box display="flex">
                  {" "}
                  <Text w="25%" textStyle="b1" color="gray.600" mr={1}>
                    {"x " + userBooking.amount_rooms}
                  </Text>
                  <Box w="136px" display="flex" justifyContent="flex-end">
                    <Text color="black" textStyle="b1">
                      {Number(userBooking.total_price_per_room)?.toLocaleString(
                        "th-TH",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}
                    </Text>
                  </Box>
                </Box>
              </Box>

              {userBooking.booking_request?.map((arr, index) => {
                if (typeof arr[1] === "number") {
                  return (
                    <Box
                      w="872px"
                      h="48px"
                      display="flex"
                      justifyContent="space-between"
                      key={index}
                    >
                      <Text textStyle="b1" color="black">
                        {arr[0].split("_").join(" ")}
                      </Text>
                      <Box display="flex" w="200px" justifyContent="flex-end">
                        <Text w="25%" textStyle="b1" color="gray.600" mr={1}>
                          {typeof arr[1] === "number"
                            ? "x " + userBooking.amount_rooms
                            : null}
                        </Text>
                        <Box w="110px" display="flex" justifyContent="flex-end">
                          <Text textStyle="b1" color="black">
                            {arr[1]?.toLocaleString("th-TH", {
                              minimumFractionDigits: 2,
                            })}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  );
                }
              })}
            </Box>
            <Box
              w="872px"
              h="65px"
              display="flex"
              justifyContent="space-between"
              alignItems="end"
              borderTop="1px solid"
              mb={10}
            >
              <Text textStyle="b1" color="black">
                Total
              </Text>
              <Text textStyle="h5" color="black" fontWeight="600">
                {" "}
                THB{" "}
                {(
                  (Number(userBooking.total_price_per_room) +
                    Number(userBooking.booking_request_price)) *
                  Number(userBooking.amount_rooms)
                )?.toLocaleString("th-TH", {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </Box>
          </Flex>

          <Flex
            w="920px"
            h="100px"
            flexDirection="column"
            justifyContent="space-evenly"
            bg="gray.300"
            mt={10}
            ml={20}
            pr={5}
            border="1px solid"
          >
            <Flex
              ml={5}
              borderBottom="1px"
              borderColor="white"
              pb={2}
              textStyle="b1"
            >
              Additional Request
            </Flex>
            <Text textStyle="b1" fontWeight="400" color="gray.700" ml={5}>
              {" "}
              {userBooking.booking_request?.length > 0 &&
              typeof userBooking.booking_request[
                userBooking.booking_request?.length - 1
              ][1] === "string"
                ? userBooking.booking_request[
                    userBooking.booking_request?.length - 1
                  ][1]
                : "-"}
            </Text>
          </Flex> */}
          <Flex w="920px" h="auto" bg="gray.100" mt={10} ml={20}>
            <Accordion allowToggle bg="gray.200" borderRadius="5px" w="920px">
              <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Text textStyle="b1" fontWeight="600">
                      Booking Detail
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Box display="flex" justifyContent="space-between">
                    {/* <Text
                              textStyle="b1"
                              fontWeight="400"
                              color="gray.700"
                            >
                              {userBooking.amount_guests} Guests (
                              {Math.ceil(
                                (new Date(userBooking.check_out_date) -
                                  new Date(userBooking.check_in_date)) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              Night)
                            </Text> */}
                    <Box display="flex">
                      {/* <Text
                                textStyle="b1"
                                fontWeight="400"
                                color="gray.700"
                              >
                                {userBooking.amount_guests} Guests (
                                {Math.ceil(
                                  (new Date(userBooking.check_out_date) -
                                    new Date(userBooking.check_in_date)) /
                                    (1000 * 60 * 60 * 24)
                                )}{" "}
                                Night) Payment success via
                              </Text> */}
                      <Text
                        ml={2}
                        textStyle="b1"
                        fontWeight="600"
                        color="gray.700"
                      >
                        Payment success via {userBooking.payment_type}
                      </Text>
                    </Box>
                  </Box>
                </AccordionPanel>
                <AccordionPanel pb={4}>
                  <Box display="flex" justifyContent="space-between">
                    <Flex w="100%" justify="space-between">
                      <Flex w="75%" justify="space-between">
                        <Text textStyle="b1" color="gray.700">
                          {userBooking.room_type_name}
                        </Text>
                        <Text
                          w="25%"
                          textStyle="b1"
                          fontWeight="600"
                          color="gray.700"
                          textAlign="end"
                        >
                          x {userBooking.amount_rooms}
                        </Text>
                      </Flex>
                      <Text textStyle="b1" fontWeight="600" color="gray.900">
                        {userBooking.total_price_per_room?.toLocaleString(
                          "th-TH",
                          {
                            minimumFractionDigits: 2,
                          }
                        )}
                      </Text>
                    </Flex>
                  </Box>
                </AccordionPanel>

                {userBooking.booking_request?.map((arr, index) => {
                  if (typeof arr[1] === "number") {
                    return (
                      <AccordionPanel pb={4} key={index}>
                        <Flex w="100%" justify="space-between">
                          <Flex w="75%" justify="space-between">
                            <Text textStyle="b1" color="gray.700">
                              {arr[0]
                                .split("_")
                                .map(
                                  (s) => s.charAt(0).toUpperCase() + s.slice(1)
                                )
                                .join(" ")}
                            </Text>
                            <Text
                              w="25%"
                              textStyle="b1"
                              fontWeight="600"
                              color="gray.700"
                              textAlign="end"
                            >
                              x {userBooking.amount_rooms}
                            </Text>
                          </Flex>
                          <Text
                            textStyle="b1"
                            fontWeight="600"
                            color="gray.900"
                          >
                            {arr[1]?.toLocaleString("th-TH", {
                              minimumFractionDigits: 2,
                            })}
                          </Text>
                        </Flex>
                      </AccordionPanel>
                    );
                  }
                })}

                <AccordionPanel pb={4}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    borderTop="1px solid"
                    color="gray.400"
                    pt={5}
                  >
                    <Text textStyle="b1" fontWeight="400" color="gray.700">
                      Total
                    </Text>
                    <Text textStyle="h5" fontWeight="600" color="gray.900">
                      THB{" "}
                      {(
                        userBooking.total_price_per_room *
                          userBooking.amount_rooms +
                        userBooking.booking_request?.reduce((sum, current) => {
                          if (typeof current[1] === "number") {
                            return sum + current[1] * userBooking.amount_rooms;
                          }
                          return sum;
                        }, 0)
                      )?.toLocaleString("th-TH", {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                  </Box>
                </AccordionPanel>
                <AccordionPanel
                  bg="gray.300"
                  h="88px"
                  borderBottomRadius="5px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-evenly"
                >
                  <Text textStyle="b1" fontWeight="600" color="gray.700" mt={2}>
                    Additional Request
                  </Text>

                  <Text textStyle="b1" fontWeight="400" color="gray.700" mt={1}>
                    {userBooking.booking_request?.length > 0 &&
                    typeof userBooking.booking_request[
                      userBooking.booking_request?.length - 1
                    ][1] === "string"
                      ? userBooking.booking_request[
                          userBooking.booking_request?.length - 1
                        ][1]
                      : "-"}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CustomerBookingDetail;
