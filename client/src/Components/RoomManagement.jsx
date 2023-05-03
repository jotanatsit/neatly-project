import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import axios from "axios";

const RoomManagement = () => {
  const [room, setRoom] = useState([]);
  const [inputData, setInputData] = useState("");

  async function getAllRooms(data) {
    try {
      const rs = await axios.get(
        `http://localhost:4000/rooms?keywords=${data}`
      );
      // console.log(rs.data.data);
      setRoom(rs.data.data);
    } catch (error) {}
  }

  useEffect(() => {
    getAllRooms(inputData);
  }, [inputData]);

  // function search input แล้วแสดงข้อมูลหน้า page admin

  function handleSearch(event) {
    setInputData(event.target.value);
    if (event.target.value === "") {
      setRoom([]);
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
          Room Management
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
                  <Popover>
                    <PopoverTrigger>
                      <Text textStyle="b1" color="black" cursor="pointer">
                        {room.room_type_id}
                      </Text>
                    </PopoverTrigger>
                    <PopoverContent w={200}>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>-</PopoverHeader>
                      <PopoverBody>Vacant</PopoverBody>
                      <PopoverBody>Dirty</PopoverBody>
                      <PopoverBody>Out of Service</PopoverBody>
                      <PopoverBody>Occupied</PopoverBody>
                    </PopoverContent>
                  </Popover>
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
