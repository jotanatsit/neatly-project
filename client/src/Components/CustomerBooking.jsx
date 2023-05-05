import React, { useState, useEffect } from "react";
import { Button, Flex, Text, Image, Box, Input } from "@chakra-ui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CustomerBookingDetail from "./CustomerBookingDetail";
import axios from "axios";
import { Search2Icon } from "@chakra-ui/icons";

const CustomerBooking = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [userBooking, setUserBooking] = useState([]);
  const [roomIndex, setRoomIndex] = useState(null);
  const [user, setUser] = useState(null);
  const [inputData, setInputData] = useState("");

  async function userBookingRoom(data) {
    try {
      const response = await axios.get(
        `http://localhost:4000/booking?keywords=${data}`
      );
      setUserBooking(response.data.data);
    } catch (error) {}
  }
  useEffect(() => {
    userBookingRoom(inputData);
  }, [inputData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ฟังก์ชั่นเมื่อกดปุ่มดูรายละเอียดบนแต่ละการจอง
  const handleViewDetail = (user, bookingDetail) => {
    setUser(user);
    setRoomIndex(bookingDetail);
    setShowDetail(true);
  };

  // แสดง Component `CustomerBookingDetail` หากกดดูรายละเอียดการจอง
  if (showDetail) {
    return (
      <CustomerBookingDetail
        setShowDetail={setShowDetail}
        user={userBooking}
        userID={user}
        index={roomIndex}
      />
    );
  }

  // function search input แล้วแสดงข้อมูลหน้า page admin

  function handleSearch(event) {
    const input = event.target.value;
    setInputData(input);
    if (input === "") {
      setUserBooking([]);
      setInputData("");
    } else {
      userBookingRoom(`%${input}%`);
    }
  }
 

  return (
    <Flex flexDirection="column">
      <Flex
        w="1200px"
        h="80px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text ml={20} textStyle="h5" color="black">
          Customer Booking
        </Text>
        <Box
          display="flex"
          w="320px"
          h="48px"
          border="1px solid"
          borderColor="gray.400"
          borderRadius={5}
          alignItems="center"
        >
          <Search2Icon boxSize={5} ml={3} color="#646D89" />
          <Input
            mr={20}
            w="320px"
            placeholder="Search..."
            border="none"
            value={inputData}
            onChange={handleSearch}
          ></Input>
        </Box>
      </Flex>

      <Flex bg="bg" h="889px" overflow="auto" justifyContent="center">
        <Box w="1080px" display="flex" flexDirection="column" mt={55}>
          <Box
            display="flex"
            alignItems="center"
            bg="gray.300"
            w="1080px"
            h="41px"
            py={30}
          >
            <Box w="180px">
              <Text textStyle="b2" textAlign="center">
                Customer name
              </Text>
            </Box>
            <Box w="96px" textStyle="b2">
              <Text textAlign="center">Guest(s)</Text>
            </Box>
            <Box w="200px" textStyle="b2">
              <Text textAlign="center">Room type</Text>
            </Box>
            <Box w="86px" textStyle="b2">
              <Text textAlign="center">Amount</Text>
            </Box>
            <Box w="167px" textStyle="b2">
              <Text textAlign="center">Bed Type</Text>
            </Box>
            <Box w="165px" textStyle="b2">
              <Text textAlign="center">Check-in</Text>
            </Box>
            <Box w="186px" textStyle="b2">
              <Text textAlign="center">Check-out</Text>
            </Box>
          </Box>
          {userBooking.map((room, index) => {
            if (room.booking_status === "Complete") {
              return (
                <Box
                  display="flex"
                  alignItems="center"
                  bg="white"
                  w="1080px"
                  h="72px"
                  py={45}
                  cursor="pointer"
                  // onClick={() => handleViewDetail(booking.id)}
                  onClick={() =>
                    handleViewDetail(room.user_id, room.booking_detail_id)
                  }
                  key={index}
                  borderBottom="1px solid"
                  borderColor="gray.300"
                >
                  <Box w="180px">
                    <Text textStyle="b1" color="black" textAlign="center">
                      {room.fullname}
                    </Text>
                  </Box>
                  <Box w="96px">
                    <Text textStyle="b1" color="black" textAlign="center">
                      {room.amount_guests}
                    </Text>
                  </Box>
                  <Box w="200px">
                    <Text textStyle="b1" color="black" textAlign="center">
                      {room.room_type_name}
                    </Text>
                  </Box>
                  <Box w="86px">
                    <Text textStyle="b1" color="black" textAlign="center">
                      {room.amount_rooms}
                    </Text>
                  </Box>
                  <Box w="167px">
                    <Text textStyle="b1" color="black" textAlign="center">
                      {room.bed_type[0].toUpperCase() + room.bed_type.slice(1)}
                    </Text>
                  </Box>
                  <Box w="165px">
                    <Text textStyle="b1" color="black" textAlign="center">
                      {room.check_in_date}
                    </Text>
                  </Box>
                  <Box w="186px">
                    <Text textStyle="b1" color="black" textAlign="center">
                      {room.check_out_date}
                    </Text>
                  </Box>
                </Box>
              );
            }
          })}
        </Box>
      </Flex>
    </Flex>
  );
};

export default CustomerBooking;
