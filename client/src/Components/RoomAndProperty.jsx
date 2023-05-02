import React, { useState, useEffect } from "react";
import { Button, Flex, Text, Image, Box, Input } from "@chakra-ui/react";
import axios from "axios";
import EditRoom from "./EditRoom";

const RoomAndProperty = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  

  // ฟังก์ชั่นเมื่อกดปุ่มดูรายละเอียดบนแต่ละการจอง
  const handleViewDetail = (bookingId) => {
    // setSelectedBookingId(bookingId);
    setShowDetail(true);
  };

  // แสดง Component `CustomerBookingDetail` กดดูรายละเอียดการจอง
  if (showDetail) {
    return (
      <EditRoom bookingId={selectedBookingId} setShowDetail={setShowDetail} />
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
        <Text ml={20} textStyle="h5">
          Room & Property
        </Text>
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
            <Box w="153px">
              <Text ml={5}>Image</Text>
            </Box>
            <Box w="240px">
              <Text>Room type</Text>
            </Box>
            <Box w="136px">
              <Text>Price</Text>
            </Box>
            <Box w="136px">
              <Text>Promotion Price</Text>
            </Box>
            <Box w="94px">
              <Text>Guest(s)</Text>
            </Box>
            <Box w="167px">
              <Text>Bed Type</Text>
            </Box>
            <Box w="128px">
              <Text>Room Size</Text>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            bg="white"
            w="1080px"
            h="120px"
            cursor="pointer"
            // onClick={() => handleViewDetail(booking.id)}
            onClick={() => handleViewDetail()}
          >
            <Box w="153px" display="flex" justifyContent="center">
              <Image
                src="/HomePage/room_5.svg"
                w="120px"
                h="72px"
                objectFit="cover"
              ></Image>
            </Box>
            <Box w="240px">
              <Text textStyle="b1" color="black">
                Superior Garden View
              </Text>
            </Box>
            <Box w="136px">
              <Text textStyle="b1" color="black">
                3,000.00
              </Text>
            </Box>
            <Box w="136px">
              <Text textStyle="b1" color="black">
                2,500.00
              </Text>
            </Box>
            <Box w="94px">
              <Text textStyle="b1" color="black">
                2
              </Text>
            </Box>
            <Box w="167px">
              <Text textStyle="b1" color="black">
                Double Bed
              </Text>
            </Box>
            <Box w="128px">
              <Text textStyle="b1" color="black">
                32 sqm
              </Text>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default RoomAndProperty;
