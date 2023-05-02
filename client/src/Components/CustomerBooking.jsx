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
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  function userBooking() {
    try {
      
    } catch (error) {
      
    }
    
  }


  // ฟังก์ชั่นเมื่อกดปุ่มดูรายละเอียดบนแต่ละการจอง
  const handleViewDetail = (bookingId) => {
    // setSelectedBookingId(bookingId);
    setShowDetail(true);
  };

  // แสดง Component `CustomerBookingDetail` หากผู้ใช้กดดูรายละเอียดการจอง
  if (showDetail) {
    return (
      <CustomerBookingDetail
        // bookingId={selectedBookingId}
        setShowDetail={setShowDetail}
      />
    );
  }

  return (
    <Flex h="1024px" flexDirection="column">
      <Flex
        w="1200px"
        h="80px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text ml={20} textStyle="h5">Customer Booking</Text>
        <Input mr={20} w="320px" border="1px solid"></Input>
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
              <Text textStyle="b2" fontWeight="500px" ml={5}>Customer name</Text>
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
          <Box
            display="flex"
            alignItems="center"
            bg="white"
            w="1080px"
            h="72px"
            cursor="pointer"
            // onClick={() => handleViewDetail(booking.id)}
            onClick={() => handleViewDetail()}
          >
            <Box w="180px">
              <Text textStyle="b1" color="black"  ml={5}>Kate Cho</Text>
            </Box>
            <Box w="96px">
              <Text textStyle="b1" color="black">2</Text>
            </Box>
            <Box w="200px">
              <Text textStyle="b1" color="black">Superior Garden View</Text>
            </Box>
            <Box w="86px">
              <Text textStyle="b1" color="black">1</Text>
            </Box>
            <Box w="167px">
              <Text textStyle="b1" color="black">Single Bed</Text>
            </Box>
            <Box w="165px">
              <Text textStyle="b1" color="black">Th, 19 Oct 2022</Text>
            </Box>
            <Box w="186px">
              <Text textStyle="b1" color="black">Fri, 20 Oct 2022</Text>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CustomerBooking;
