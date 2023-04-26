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

  const [rooms, setRooms] = useState(0);
  const [guests, setGuests] = useState(0);

  //Date
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleRoomsIncrement = () => {
    setRooms(rooms + 1);
  };

  const handleRoomsDecrement = () => {
    if (rooms > 0) {
      setRooms(rooms - 1);
    }
  };

  const handleGuestsIncrement = () => {
    setGuests(guests + 1);
  };

  const handleGuestsDecrement = () => {
    if (guests > 0) {
      setGuests(guests - 1);
    }
  };

  //กดเสร็จไปหน้า booking พร้อมข้อมูล
  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/booking", { state: { date, rooms, guests } });
  };

  const currentDate = new Date();

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
                  {rooms} room, {guests} guests
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
                  <Box>{rooms}</Box>
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
                  <Box>{guests}</Box>
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
