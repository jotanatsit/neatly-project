import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Menu,
  MenuButton,
  MenuList,
  ListItem,
} from "@chakra-ui/react";
import Nav_nonuser from "../Components/Nav_nonuser";
import Nav_user from "../Components/Nav_user";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Footer from "../Components/Footer";
import { useAuth } from "../contexts/authentication";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import SearchRooms from "../Components/SearchRooms";
import axios from "axios";

const BookingPage = () => {
  const auth = useAuth();

  //ใช้ useLocation ในการเข้าถึงข้อมูล url booking เมื่อ log ก็เห็นข้อมูลใน console แล้วนำมาใส่ใน useState Date กับ Room and Guest
  const location = useLocation();

  const [rooms, setRooms] = useState(location.state.rooms);
  const [guests, setGuests] = useState(location.state.guests);
  const [date, setDate] = useState(location.state.date);
  const [checkInDate, setCheckInDate] = useState(date[0].startDate);
  const [checkOutDate, setCheckOutDate] = useState(date[0].endDate);
  const [roomData, setRoomData] = useState([]);

  // default search 0 rooms , 0 guest that it shows that has always 1 rooms , 2 guest
  function defaultRoom() {
    if (guests === 0 && rooms === 0) {
      return setGuests(1), setRooms(1);
    } else if (rooms === 0) {
      return setRooms(1);
    } else if (guests === 0) {
      return setGuests(1);
    }
  }

  async function getRoomData() {
    defaultRoom();
    try {
      const response = await axios.get(
        `http://localhost:4000/rooms/room-type/search?check_in_date=${checkInDate}&check_out_date=${checkOutDate}&amount_guests=${guests}`
      );
      setRoomData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRoomData();
  }, [guests, rooms]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function getMaximam() {
    try {
      const response = await axios.get(
        `http://localhost:4000/rooms/room-type/max-guests`
      );

      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }

  const handleRoomsIncrement = async () => {
    const maximum = await getMaximam();
    if (rooms < maximum.rooms) {
      setRooms(rooms + 1);
    }
  };

  const handleRoomsDecrement = () => {
    if (rooms > 0) {
      setRooms(rooms - 1);
    }
  };

  const handleGuestsIncrement = async () => {
    const maximum = await getMaximam();
    if (guests < maximum.guests) {
      setGuests(guests + 1);
    }
  };

  const handleGuestsDecrement = () => {
    if (guests > 0) {
      setGuests(guests - 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getRoomData();
  };

  return (
    <Flex flexDirection="column" w="1440px" m="auto">
      {auth.isAuthenticated ? <Nav_user /> : <Nav_nonuser />}
      <form onSubmit={handleSubmit}>
        <Flex
          bg="white"
          height="156px"
          width="1440px"
          alignItems="center"
          justifyContent="space-around"
          borderBottomRadius={10}
          boxShadow="2xl"
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
                    {format(checkInDate, "eee, dd MMM yyyy")}
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
                    {format(checkOutDate, "eee, dd MMM yyyy")}
                  </Text>
                </MenuButton>
              </Flex>
              <MenuList border="1px solid" position="absolute" right="-240px">
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    setDate([item.selection]);
                    setCheckInDate(item.selection.startDate);
                    setCheckOutDate(item.selection.endDate);
                  }}
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

            <Button type="submit" variant="secondary" w="144px">
              Search
            </Button>
          </Flex>
        </Flex>
      </form>
      {/* rooms */}
      <Flex
        w="1440px"
        height="2450px"
        flexDirection="column"
        alignItems="center"
        bg="bg"
      >
        {roomData.map((item, index) => {
          return (
            <SearchRooms
              key={index}
              room_type_id={item.room_type_id}
              room={item}
              rooms={rooms}
              guests={guests}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
            />
          );
        })}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default BookingPage;
