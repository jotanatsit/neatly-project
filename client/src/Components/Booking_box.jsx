import React, { useState } from 'react'
import { Button, Flex, Text, Input, Box, Image, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon} from "@chakra-ui/icons";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link as RouterLink } from "react-router-dom";
import room from '../../data/image_room';


const Booking_box = () => {

  //room
  const [rooms, setRooms] = useState(0);
  const [guests, setGuests] = useState(0);
 

  //Date
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  
 
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

  return (
    <Flex bg="white" height="196px" width="1120px" mx="auto" mb={50} alignItems="center" justifyContent="space-around" borderRadius={10}>
    <Flex w="1000px" h="76px" flexDirection="row" justifyContent="space-between" alignItems="end">
      <Flex flexDirection="column">
        <Text textStyle="b1"><label>Check in</label></Text>
        <Input w="240px" color="gray.600" borderColor="gray.400" type="date" />
      </Flex>
      <Text mb={4}>-</Text>
      <Flex flexDirection="column">
        <Text textStyle="b1"><label>Check Out</label></Text>
        <Input w="240px" color="gray.600" borderColor="gray.400" type="date" />
      </Flex>

      <Menu>
        <Flex flexDirection="column">
          <Text textStyle="b1"><label>Rooms & Guests</label></Text>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} iconSpacing="10" cursor="pointer" _hover={{ bg: "none" }}  _focus={{ bg: 'none' }} color="gray.600" bg="white" border="1px solid" borderColor="gray.400" aria-label="Open menกu">
            <Text textStyle="b1" mr="">{rooms}room, {guests}guests</Text>
          </MenuButton> 
        </Flex>
        <MenuList w="240px" maxH="96px">
          <Flex className="input-box">
            <Box ml={4}>Rooms</Box>
            <Flex position="absolute" w="78px" left="145px" justifyContent="space-between">
              <Image src="/HomePage/icon/icon_decrement.svg" onClick={handleRoomsDecrement} cursor="pointer" />
              <Box>{rooms}</Box>
              <Image src="/HomePage/icon/icon_increment.svg" onClick={handleRoomsIncrement} cursor="pointer" />
            </Flex>
          </Flex>
          <Flex className="input-box">
            <Box ml={4}>Guests</Box>
            <Flex position="absolute" w="78px" left="145px" justifyContent="space-between">
              <Image src="/HomePage/icon/icon_decrement.svg" onClick={handleGuestsDecrement} cursor="pointer" />
              <Box>{guests}</Box>
              <Image src="/HomePage/icon/icon_increment.svg" onClick={handleGuestsIncrement} cursor="pointer" />
            </Flex>
          </Flex>
        </MenuList>
      </Menu>

      <RouterLink to="/booking">
        <Button variant="primary" w="144px">
          Book Now
        </Button>
      </RouterLink>
    </Flex>
  </Flex>
  )
}

export default Booking_box