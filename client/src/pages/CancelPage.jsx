import React, { useState, useEffect } from "react";
import Nav_user from "../Components/Nav_user";
import { Button, Flex, Text, Image, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/authentication";

const CancelPage = () => {
  const location = useLocation();
  const userId = useAuth();

  const [roomData, setRoomData] = useState(location.state.roomData);
  const [roomDetail, setRoomDetail] = useState({});
  const index = location.state.cancelIndex;

  async function getRoomData() {
    try {
      const response = await axios.get(
        `http://localhost:4000/booking/${userId.UserIdFromLocalStorage}/${roomData[index].booking_detail_id}`
      );
      setRoomDetail(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRoomData();
  }, []);

  return (
    <Flex flexDirection="column" w="1440px" h="1028px" m="auto" bg="bg">
      <Nav_user />
      <Flex flexDirection="column" w="1440px" h="1028px" mt={20}>
        <Flex
          w="738px"
          h="615px"
          flexDirection="column"
          mt="50px"
          mx="auto"
          borderRadius="5px"
        >
          <Box w="738px" h="505px" borderRadius="5px" overflow="hidden">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              h="189px"
              bg="green.800"
            >
              <Text textStyle="h3" color="white">
                The Cancellation is Complete
              </Text>
              <Text textAlign="center" textStyle="b2" color="green.400" mt={4}>
                The cancellation is complete. <br />
                You will recieve an email with a detail of cancellation within
                24 hours.
              </Text>
            </Box>
            <Box h="318px" bg="green.700" p="25px 40px">
              <Box
                h="254px"
                bg="green.600"
                borderRadius="5px"
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
              >
                <Box
                  ml={8}
                  h="110px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-around"
                >
                  <Text textStyle="h5" fontWeight="600" color="white">
                    {roomDetail.room_type_name}
                  </Text>
                  <Text textStyle="b1" fontWeight="600" color="white">
                    {new Date(roomDetail.check_in_date).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                      }
                    )}
                    -{" "}
                    {new Date(roomDetail.check_out_date).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                      }
                    )}
                  </Text>
                  <Text textStyle="b1" fontWeight="400" color="white">
                    {roomDetail.amount_guests} Guests
                  </Text>
                </Box>
                <Box
                  ml={8}
                  h="56px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-around"
                >
                  <Text textStyle="b1" fontWeight="400" color="green.300">
                    Booking date:{" "}
                    {new Date(roomDetail.booking_date).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                      }
                    )}
                  </Text>
                  <Text textStyle="b1" fontWeight="400" color="green.300">
                    Cancellation date:{" "}
                    {new Date(roomDetail.cancellation_date).toLocaleDateString(
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
              </Box>
            </Box>
          </Box>

          <Box
            display="flex"
            h="106px"
            justifyContent="center"
            alignItems="flex-end"
          >
            <Link to="/">
              <Button variant="primary" p="25px 40px">
                Back to Home
              </Button>
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CancelPage;
