import React, { useState } from 'react'
import { Button, Flex, Text, Input, Select, Box} from '@chakra-ui/react'


const Booking_box = () => {

  const [rooms, setRooms] = useState(0);
  const [guests, setGuests] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
 
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
      <Flex w="1000px" h="76px"  flexDirection="row" justifyContent="space-between" alignItems="end" border="1px solid">
        <Flex flexDirection="column">
          <label>Check in</label>
          <Input w="240px" color="gray.600" type="date" />
        </Flex>
        <Text mb={4}>-</Text>
        <Flex flexDirection="column">
          <label>Check Out</label>
          <Input w="240px" color="gray.600" type="date" />
        </Flex>

        <Flex flexDirection="column" border="1px solid">
      <label>Rooms & Guests</label>
      <Flex align="center">
        <Input
          type="text"
          value={`${rooms} Rooms, ${guests} Guests`}
          onClick={toggleDropdown}
          readOnly
        />
      <Button onClick={toggleDropdown}>อิอิ</Button>
      </Flex>
      {isOpen && (
        <Flex flexDirection="column">
          <Flex className="input-box">
            <div>Rooms</div>
            <button onClick={handleRoomsDecrement}>-</button>
            <span>{rooms}</span>
            <button onClick={handleRoomsIncrement}>+</button>
          </Flex>
          <Flex className="input-box">
            <div>Guests</div>
            <button onClick={handleGuestsDecrement}>-</button>
            <span>{guests}</span>
            <button onClick={handleGuestsIncrement}>+</button>
          </Flex>
        </Flex>
      )}
    </Flex>
        <Button bg="#C14817" color="white" w="144px">Book Now</Button>
      </Flex>
    </Flex>
  )
}

export default Booking_box