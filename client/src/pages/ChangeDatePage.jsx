import React, { useState, useEffect } from "react";
import Nav_user from "../Components/Nav_user";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Menu,
  MenuButton,
  MenuList,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format, addDays } from "date-fns";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/authentication";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ChangeDatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const userId = useAuth();
  const [roomData, setRoomData] = useState(location.state.roomData);
  const [roomDetail, setRoomDetail] = useState({});
  const index = location.state.index;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  async function getRoomData() {
    try {
      const response = await axios.get(
        `http://localhost:4000/booking/${userId.UserIdFromLocalStorage}/${roomData[index].booking_detail_id}`
      );
      setRoomDetail(response.data.data);
      setDate([
        {
          startDate: new Date(response.data.data.check_in_date),
          endDate: new Date(response.data.data.check_out_date),
          key: "selection",
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRoomData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function changeDate() {
    try {
      axios
        .put(
          `http://localhost:4000/booking/${userId.UserIdFromLocalStorage}/${roomData[index].booking_detail_id}`,
          {
            check_in_date: new Date(date[0].startDate.getTime() + 43200000),
            check_out_date: new Date(date[0].endDate.getTime() + 43200000),
          }
        )
        .then((response) => {
          console.log(response.data);

          navigate("/history");
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex flexDirection="column" w="1440px" m="auto" bg="bg">
      <Nav_user />
      <Flex flexDirection="column" w="1440px" h="1500px">
        <Text textStyle="h2" color="black" ml="150px" mt="50px">
          Change Check-in <br /> and Check-out Date
        </Text>
        <Flex
          w="1120px"
          flexDirection="column"
          mt="50px"
          ml="150px"
          borderBottom="2px solid"
          borderColor="gray.300"
          pb={10}
        >
          <Box display="flex" flexDirection="row">
            <Image
              src={
                roomDetail &&
                roomDetail.room_picture &&
                roomDetail.room_picture[0]
              }
              w="310px"
              h="210px"
              objectFit="cover"
              borderRadius={9}
            />
            <Flex w="769px" flexDirection="column" ml="40px">
              <Box display="flex" justifyContent="space-between">
                <Text textStyle="h4" color="black">
                  {roomDetail.room_type_name}
                </Text>
                <Text textStyle="b1" color="gray.600">
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
              </Box>
              <Box display="flex" mt="20px">
                <Box>
                  <Text textStyle="b1" fontWeight="600">
                    Original Date
                  </Text>
                  <Text textStyle="b1">
                    {new Date(roomDetail.check_in_date).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                      }
                    )}{" "}
                    -{" "}
                    {new Date(roomDetail.check_out_date).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                      }
                    )}{" "}
                  </Text>
                </Box>
              </Box>
              <Box
                mt="40px"
                w="715px"
                h="125px"
                bg="white"
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
              >
                <Text textStyle="b1" fontWeight="600" ml={4}>
                  Change Date
                </Text>
                <Box display="flex" ml={4} alignItems="center">
                  <Menu>
                    <Flex flexDirection="column">
                      <Text textStyle="b1">
                        <label>Check In</label>
                      </Text>
                      <MenuButton
                        as={Button}
                        iconSpacing="10"
                        cursor="pointer"
                        _hover={{ bg: "none" }}
                        _focus={{ bg: "none" }}
                        color="gray.600"
                        bg="white"
                        border="1px solid"
                        borderColor="gray.400"
                        style={{ width: "250px" }}
                      >
                        <Box
                          w="210px"
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text textStyle="b1">
                            {format(date[0].startDate, "MM/dd/yyyy")}
                          </Text>
                          <CalendarIcon />
                        </Box>
                      </MenuButton>
                    </Flex>
                    <Text mx={5}>-</Text>
                    <Flex flexDirection="column">
                      <Text textStyle="b1">
                        <label>Check Out</label>
                      </Text>
                      <MenuButton
                        as={Button}
                        iconSpacing="10"
                        cursor="pointer"
                        _hover={{ bg: "none" }}
                        _focus={{ bg: "none" }}
                        color="gray.600"
                        bg="white"
                        border="1px solid"
                        borderColor="gray.400"
                        style={{ width: "250px" }}
                      >
                        <Box
                          w="210px"
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text textStyle="b1">
                            {format(date[0].endDate, "MM/dd/yyyy")}
                          </Text>
                          <CalendarIcon />
                        </Box>
                      </MenuButton>
                    </Flex>
                    <MenuList position="absolute" right="-240px">
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        style={{ width: "500px" }}
                        minDate={addDays(new Date(), 0)}
                        dateDisplayFormat="eee, dd MMM yyyy"
                        rangeColors={["#E76B39", "#E76B39", "#E76B39"]}
                      />
                    </MenuList>
                  </Menu>
                </Box>
              </Box>
            </Flex>
          </Box>
          <Box
            w="1120px"
            display="flex"
            justifyContent="space-between"
            mt="20px"
          >
            <Button variant="ghost" color="orange.600">
              Cancel Booking
            </Button>
            <Box>
              <Button variant="primary" p="25px 25px" onClick={onOpen}>
                Change Date
              </Button>
            </Box>
          </Box>
        </Flex>
      </Flex>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>
            <Text color="black">Change Date</Text>
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Text textStyle="b1">
              Are you sure you want to change your check-in and check-out date?
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button variant="secondary" onClick={onClose}>
              No, I don’t
            </Button>
            <Button
              variant="primary"
              ref={cancelRef}
              onClick={changeDate}
              ml={3}
            >
              Yes, I want to change
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
};

export default ChangeDatePage;
