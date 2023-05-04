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
import axios from "axios";
import { Search2Icon } from "@chakra-ui/icons";

const RoomAndProperty = () => {
  // const [showDetail, setShowDetail] = useState(false);
  const [roomType, setRoomType] = useState([]);
  const [price, setPrice] = useState([]);
  const [promoPrice, setPromoPrice] = useState([]);
  const [inputData, setInputData] = useState("");

  async function typeRoom(data) {
    try {
      const rs = await axios.get(
        `http://localhost:4000/rooms/room-type?keywords=${data}`
      );
      // console.log(rs.data.data);
      setRoomType(rs.data.data);

      const tempPrice = [];
      for (let i = 0; i < rs.data.data.length; i++) {
        tempPrice.push(rs.data.data[i].price);
        setPrice(tempPrice);
      }
      const tempPromoPrice = [];
      for (let i = 0; i < rs.data.data.length; i++) {
        tempPromoPrice.push(rs.data.data[i].promotion_price);
        setPromoPrice(tempPromoPrice);
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(price);

  useEffect(() => {
    typeRoom(inputData);
  }, [inputData]);

  // function search input แล้วแสดงข้อมูลหน้า page admin

  function handleSearch(event) {
    setInputData(event.target.value);
    if (event.target.value === "") {
      setRoomType([]);
      setInputData("");
    }
  }

  // ฟังก์ชั่นเมื่อกดปุ่มดูรายละเอียดบนแต่ละการจอง
  const handleViewDetail = (bookingId) => {
    setShowDetail(true);
  };

  // แสดง Component `CustomerBookingDetail` กดดูรายละเอียดการจอง
  // if (showDetail) {
  //   return (
  //     <EditRoom b setShowDetail={setShowDetail} />
  //   );
  // }

  async function changePrice(roomTypeId, index) {
    console.log(price[index]);
    console.log(price);
    console.log(promoPrice);
    console.log(roomTypeId);
    try {
      const response = await axios.put(
        `http://localhost:4000/rooms/room-type/${roomTypeId}`,
        {
          price: price[index],
          promotion_price: promoPrice[index],
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
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
          {roomType.map((room, index) => {
            return (
              <Box
                display="flex"
                alignItems="center"
                bg="white"
                w="1080px"
                h="120px"
                cursor="pointer"
                // onClick={() => handleViewDetail(booking.id)}
                // onClick={() => handleViewDetail()}
                key={index}
              >
                <Box w="153px" display="flex" justifyContent="center">
                  <Image
                    src={room.room_picture[0]}
                    w="120px"
                    h="72px"
                    objectFit="cover"
                  ></Image>
                </Box>
                <Box w="240px">
                  <Text textStyle="b1" color="black">
                    {room.room_type_name}
                  </Text>
                </Box>
                <Box w="136px">
                  <Popover>
                    <PopoverTrigger>
                      <Text textStyle="b1" color="black">
                        {price[index]}
                      </Text>
                    </PopoverTrigger>
                    <PopoverContent shadow="2xl">
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Price</PopoverHeader>
                      <PopoverBody>
                        <Input
                          border="1px solid"
                          borderColor="gray.400"
                          value={price[index]}
                          type="number"
                          onChange={(e) => {
                            const newPrice = [...price]; // create a copy of the price array
                            newPrice[index] = e.target.value; // modify the copy
                            setPrice(newPrice); // update the state with the modified copy
                          }}
                          onKeyPress={(event) => {
                            // เช็คว่า key ที่กดเป็น enter และเช็คว่ามีข้อความด้านในไหม
                            if (event.key === "Enter") {
                              changePrice(room.room_type_id, index);
                            }
                          }}
                        />
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>
                <Box w="136px">
                  <Popover>
                    <PopoverTrigger>
                      <Text textStyle="b1" color="black">
                        {promoPrice[index] ? promoPrice[index] : "-"}
                      </Text>
                    </PopoverTrigger>
                    <PopoverContent shadow="2xl">
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Promotoin Price</PopoverHeader>
                      <PopoverBody>
                        <Input
                          border="1px solid"
                          borderColor="gray.400"
                          value={promoPrice[index]}
                          type="number"
                          onChange={(e) => {
                            const newPromoPrice = [...promoPrice]; // create a copy of the promoPrice array
                            newPromoPrice[index] = e.target.value; // modify the copy
                            setPromoPrice(newPromoPrice); // update the state with the modified copy
                          }}
                          onKeyPress={(event) => {
                            // เช็คว่า key ที่กดเป็น enter และเช็คว่ามีข้อความด้านในไหม
                            if (event.key === "Enter") {
                              changePrice(room.room_type_id, index);
                            }
                          }}
                        />
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>
                <Box w="94px">
                  <Text textStyle="b1" color="black">
                    {room.amount_person}
                  </Text>
                </Box>
                <Box w="167px">
                  <Text textStyle="b1" color="black">
                    {room.bed_type[0].toUpperCase() + room.bed_type.slice(1)}
                  </Text>
                </Box>
                <Box w="128px">
                  <Text textStyle="b1" color="black">
                    {room.room_size}
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

export default RoomAndProperty;
