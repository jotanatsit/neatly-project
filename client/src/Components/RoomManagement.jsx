import React, { useState, useEffect } from "react";
import { Button, Flex, Text, Image, Box, Input } from "@chakra-ui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import axios from "axios";

const RoomManagement = () => {
  const [room, setRoom] = useState([]);

  async function getAllRooms() {
    try {
      const rs = await axios.get(`http://localhost:4000/rooms`);
      console.log(rs.data.data);
      setRoom(rs.data.data);
    } catch (error) {}
  }

  useEffect(() => {
    getAllRooms();
  }, []);

  return (
    <Flex flexDirection="column">
      <Flex
        w="1200px"
        h="80px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text ml={20} textStyle="h5">
          Room Management
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
            <Box w="120px">
              <Text ml={5}>Room no.</Text>
            </Box>
            <Box w="367px">
              <Text>Room type</Text>
            </Box>
            <Box w="300px">
              <Text>Bed Type</Text>
            </Box>
            <Box w="293px">
              <Text>Status</Text>
            </Box>
          </Box>
          {room.map((room, index) => {
            return (
              <Box
                display="flex"
                alignItems="center"
                bg="white"
                w="1080px"
                h="72px"
                borderBottom="1px solid"
                borderColor="gray.300"
                key={index}
              >
                <Box w="120px">
                  <Text textStyle="b1" color="black" ml={5}>
                    {room.room_id}
                  </Text>
                </Box>
                <Box w="367px">
                  <Text textStyle="b1" color="black">
                    {room.room_type_name}
                  </Text>
                </Box>
                <Box w="300px">
                  <Text textStyle="b1" color="black">
                    {room.bed_type}
                  </Text>
                </Box>
                <Box w="293px">
                  <Text textStyle="b1" color="black">
                    {room.room_type_id}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Flex>
    </Flex>
  );
};

export default RoomManagement;
