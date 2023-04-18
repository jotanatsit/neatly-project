import React, { useState } from "react";
import {
  Button,
  Flex,
  Text,
  Input,
  Box,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";



const Booking_box = () => {
  const navigate = useNavigate();
  //room
  const [options, setOptions] = useState({
    rooms: 0,
    guests: 0,
  });

  //Date
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleRoomsIncrement = () => {
    setOptions({ ...options, rooms: options.rooms + 1 });
  };

  const handleRoomsDecrement = () => {
    if (options.rooms > 0) {
      setOptions({ ...options, rooms: options.rooms - 1 });
    }
  };

  const handleGuestsIncrement = () => {
    setOptions({ ...options, guests: options.guests + 1 });
  };

  const handleGuestsDecrement = () => {
    if (options.guests > 0) {
      setOptions({ ...options, guests: options.guests - 1 });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/booking",{state: {date,options}})
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        bg="white"
        height="196px"
        width="1120px"
        mx="auto"
        mb={50}
        alignItems="center"
        justifyContent="space-around"
        borderRadius={10}
        position="relative"
      >
        <Flex
          w="1000px"
          h="76px"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="end"
        >
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
                <Text textStyle="b1">
                  {format(date[0].startDate, "MM/dd/yyyy")}
                </Text>
              </MenuButton>
            </Flex>
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
                <Text textStyle="b1">
                  {format(date[0].endDate, "MM/dd/yyyy")}
                </Text>
              </MenuButton>
            </Flex>
            <MenuList border="1px solid" position="absolute" right="-240px">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                style={{ width: "500px" }}
              />
            </MenuList>
          </Menu>

          <Menu>
            <Flex flexDirection="column">
              <Text textStyle="b1">
                <label>Rooms & Guests</label>
              </Text>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
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
                <Text textStyle="b1">
                  {options.rooms} room, {options.guests} guests
                </Text>
              </MenuButton>
            </Flex>
            <MenuList w="250px" maxH="96px">
              <Flex className="input-box">
                <Box ml={4}>Rooms</Box>
                <Flex
                  position="absolute"
                  w="78px"
                  left="145px"
                  justifyContent="space-between"
                >
                  <Image
                    src="/HomePage/icon/icon_decrement.svg"
                    onClick={handleRoomsDecrement}
                    cursor="pointer"
                  />
                  <Box>{options.rooms}</Box>
                  <Image
                    src="/HomePage/icon/icon_increment.svg"
                    onClick={handleRoomsIncrement}
                    cursor="pointer"
                  />
                </Flex>
              </Flex>
              <Flex className="input-box">
                <Box ml={4}>Guests</Box>
                <Flex
                  position="absolute"
                  w="78px"
                  left="145px"
                  justifyContent="space-between"
                >
                  <Image
                    src="/HomePage/icon/icon_decrement.svg"
                    onClick={handleGuestsDecrement}
                    cursor="pointer"
                  />
                  <Box>{options.guests}</Box>
                  <Image
                    src="/HomePage/icon/icon_increment.svg"
                    onClick={handleGuestsIncrement}
                    cursor="pointer"
                  />
                </Flex>
              </Flex>
            </MenuList>
          </Menu>

          <Button type="submit" variant="primary" w="144px">
            Search
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default Booking_box;
