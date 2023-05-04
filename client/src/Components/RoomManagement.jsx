import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Search2Icon } from "@chakra-ui/icons";
import axios from "axios";

const RoomManagement = () => {
  const [room, setRoom] = useState([]);
  const [status, setStatus] = useState("");
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

  console.log(status);

  async function updateStatus() {
    await axios.put();
  }

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

      <Flex bg="bg" h="1000px" justifyContent="center">
        <Box w="1080px" display="flex" flexDirection="column" mt={55}>
          <Box
            display="flex"
            alignItems="center"
            bg="gray.300"
            w="1080px"
            h="41px"
            py={30}
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
                    {room.bed_type[0].toUpperCase() + room.bed_type.slice(1)}
                  </Text>
                </Box>
                <Box>
                  <Menu>
                    {room.room_type_id === "Vacant" ? (
                      <MenuButton>
                        <Box
                          h="29px"
                          bg="#E5FFFA"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px 10px"
                          cursor="pointer"
                          borderRadius={5}
                        >
                          <Text textStyle="b1" color="#006753">
                            {room.room_type_id}
                          </Text>
                        </Box>
                      </MenuButton>
                    ) : room.room_type_id === "Dirty" ? (
                      <MenuButton>
                        <Box
                          h="29px"
                          bg="#FFE5E5"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px 10px"
                          borderRadius={5}
                        >
                          <Text textStyle="b1" color="#A50606" cursor="pointer">
                            {room.room_type_id}
                          </Text>
                        </Box>
                      </MenuButton>
                    ) : room.room_type_id === "Out of Service" ? (
                      <MenuButton>
                        <Box
                          h="29px"
                          bg="#F0F1F8"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px 10px"
                          borderRadius={5}
                        >
                          <Text textStyle="b1" color="#6E7288" cursor="pointer">
                            {room.room_type_id}
                          </Text>
                        </Box>
                      </MenuButton>
                    ) : room.room_type_id === "Occupied" ? (
                      <MenuButton>
                        <Box
                          h="29px"
                          bg="#E4ECFF"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px 10px"
                          borderRadius={5}
                        >
                          <Text textStyle="b1" color="#084BAF" cursor="pointer">
                            {room.room_type_id}
                          </Text>
                        </Box>
                      </MenuButton>
                    ) : null}

                    <MenuList boxShadow="2xl">
                      <MenuItem
                        onClick={() => {
                          setStatus("Vacant");
                        }}
                      >
                        <Box
                          h="29px"
                          bg="#E5FFFA"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px 10px"
                          cursor="pointer"
                          borderRadius={5}
                        >
                          <Text textStyle="b1" color="#006753">
                            Vacant
                          </Text>
                        </Box>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setStatus("Dirty");
                        }}
                      >
                        <Box
                          h="29px"
                          bg="#FFE5E5"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px 10px"
                          borderRadius={5}
                        >
                          <Text textStyle="b1" color="#A50606" cursor="pointer">
                            Dirty
                          </Text>
                        </Box>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setStatus("Out of Service");
                        }}
                      >
                        <Box
                          h="29px"
                          bg="#F0F1F8"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px 10px"
                          borderRadius={5}
                        >
                          <Text textStyle="b1" color="#6E7288" cursor="pointer">
                            Out of Service
                          </Text>
                        </Box>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setStatus("Occupied");
                        }}
                      >
                        <Box
                          h="29px"
                          bg="#E4ECFF"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px 10px"
                          borderRadius={5}
                        >
                          <Text textStyle="b1" color="#084BAF" cursor="pointer">
                            Occupied
                          </Text>
                        </Box>
                      </MenuItem>
                    </MenuList>
                  </Menu>
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
