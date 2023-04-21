import React, { useState } from "react";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import Nav_nonuser from "../Components/Nav_nonuser";
import Nav_user from "../Components/Nav_user";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/authentication";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import rooms from "../../data/search_room";
import SearchRooms from "../Components/SearchRooms";

const BookingPage = () => {
  const auth = useAuth();

  //ใช้ useLocation ในการเข้าถึงข้อมูล url booking เมื่อ log ก็เห็นข้อมูลใน console แล้วนำมาใส่ใน useState Date กับ Room and Guest
  const location = useLocation();
  console.log(location);

  //Room and Guest
  const [options, setOptions] = useState(location.state.options);

  //Date
  const [date, setDate] = useState(location.state.date);

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
  };

  return (
    <Flex flexDirection="column" w="1440px">
      {auth.isAuthenticated ? <Nav_user /> : <Nav_nonuser />}
      <form onSubmit={handleSubmit}>
        <Flex
          bg="white"
          height="156px"
          width="1440px"
          alignItems="center"
          justifyContent="space-around"
          borderRadius={10}
          border="1px solid"
          borderColor="gray.400"
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

            <Button type="submit" variant="secondary" w="144px">
              Search
            </Button>
          </Flex>
        </Flex>
      </form>
      {/* rooms */}
      <Flex
        w="1440px"
        height="1895px"
        flexDirection="column"
        alignItems="center"
        bg="#EDECEC"
      >
        {rooms.map((item) => (
          <SearchRooms item={item} key={item.eid} />
        ))}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default BookingPage;
