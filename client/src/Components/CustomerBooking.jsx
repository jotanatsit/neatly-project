import React, { useState, useEffect } from "react";
import { Button, Flex, Text, Image, Box, Input } from "@chakra-ui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";
import CustomerBookingDetail from "./CustomerBookingDetail";
import { Link } from "react-router-dom";
import axios from "axios";

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
        userr={user}
        index={roomIndex}
      />
    );
  }

  // function search input แล้วแสดงข้อมูลหน้า page admin

  function handleSearch(event) {
    setInputData(event.target.value);
    if (event.target.value === "") {
      setUserBooking([]);
      setInputData("");
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
        <Text ml={20} textStyle="h5">
          Customer Booking
        </Text>
        <Input
          mr={20}
          w="320px"
          border="1px solid"
          placeholder="Search..."
          borderColor="gray.500"
          value={inputData}
          onChange={handleSearch}
        ></Input>
      </Flex>

      <Flex bg="bg" h="1000px" justifyContent="center">
        <Box w="1080px" display="flex" flexDirection="column" mt={55}>
          <Box
            display="flex"
            alignItems="center"
            bg="gray.300"
            w="1080px"
            h="41px"
          >
            <Box w="180px">
              <Text textStyle="b2" fontWeight="500px" ml={5}>
                Customer name
              </Text>
            </Box>
            <Box w="96px">
              <Text>Guest(s)</Text>
            </Box>
            <Box w="200px">
              <Text>Room type</Text>
            </Box>
            <Box w="86px">
              <Text>Amount</Text>
            </Box>
            <Box w="167px">
              <Text>Bed Type</Text>
            </Box>
            <Box w="165px">
              <Text>Check-in</Text>
            </Box>
            <Box w="186px">
              <Text>Check-out</Text>
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
                    <Text textStyle="b1" color="black" ml={5}>
                      {room.fullname}
                    </Text>
                  </Box>
                  <Box w="96px">
                    <Text textStyle="b1" color="black">
                      {room.amount_guests}
                    </Text>
                  </Box>
                  <Box w="200px">
                    <Text textStyle="b1" color="black">
                      {room.room_type_name}
                    </Text>
                  </Box>
                  <Box w="86px">
                    <Text textStyle="b1" color="black">
                      {room.amount_rooms}
                    </Text>
                  </Box>
                  <Box w="167px">
                    <Text textStyle="b1" color="black">
                      Single Bed
                    </Text>
                  </Box>
                  <Box w="165px">
                    <Text textStyle="b1" color="black">
                      {room.check_in_date}
                    </Text>
                  </Box>
                  <Box w="186px">
                    <Text textStyle="b1" color="black">
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
