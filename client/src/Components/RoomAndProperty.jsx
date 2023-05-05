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
  const [showChangePrice, setShowChangePrice] = useState(null);
  const [showChangePromoPrice, setShowChangePromoPrice] = useState(null);

  function showPrice(index) {
    setShowChangePrice(index);
  }
  function hidePrice() {
    setShowChangePrice(null);
  }

  function showPromoPrice(index) {
    setShowChangePromoPrice(index);
  }

  async function typeRoom(data) {
    try {
      const rs = await axios.get(
        `http://localhost:4000/rooms/room-type?keywords=${data}`
      );

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

  useEffect(() => {
    typeRoom(inputData);
  }, [inputData]);

  // function search input แล้วแสดงข้อมูลหน้า page admin

  function handleSearch(event) {
    const input = event.target.value;
    setInputData(input);
    if (input === "") {
      setRoomType([]);
      setInputData("");
    } else {
      typeRoom(`%${input}%`);
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
    try {
      const response = await axios.put(
        `http://localhost:4000/rooms/room-type/${roomTypeId}`,
        {
          price: price[index],
          promotion_price: promoPrice[index],
        }
      );
      console.log(response.data);
      setShowChangePrice(null);
      setShowChangePromoPrice(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex h="100vh" bg="bg" flexDirection="column" alignItems="center">
      <Flex
        w="1200px"
        h="80px"
        alignItems="center"
        justifyContent="space-between"
        bg="white"
      >
        <Text ml={20} textStyle="h5" color="black">
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

      <Box w="1080px" display="flex" flexDirection="column" mt={55}>
        <Box
          display="flex"
          alignItems="center"
          bg="gray.300"
          w="1080px"
          h="41px"
          py={30}
        >
          <Box w="153px">
            <Text ml={5} textStyle="b2">
              Image
            </Text>
          </Box>
          <Box w="240px">
            <Text ml={5} textStyle="b2">
              Room type
            </Text>
          </Box>
          <Box w="136px">
            <Text ml={5} textStyle="b2">
              Price
            </Text>
          </Box>
          <Box w="136px">
            <Text ml={5} textStyle="b2">
              Promotion Price
            </Text>
          </Box>
          <Box w="94px">
            <Text ml={5} textStyle="b2">
              Guest(s)
            </Text>
          </Box>
          <Box w="167px">
            <Text ml={5} textStyle="b2">
              Bed Type
            </Text>
          </Box>
          <Box w="128px">
            <Text ml={5} textStyle="b2">
              Room Size
            </Text>
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
              borderBottom="1px solid"
              borderColor="gray.300"
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
                <Text textStyle="b1" color="black" ml={5}>
                  {room.room_type_name}
                </Text>
              </Box>
              <Box>
                <Box
                  w="136px"
                  onClick={() => showPrice(index)}
                  position="relative"
                >
                  <Text textStyle="b1" color="black" ml={5}>
                    {price[index].toLocaleString("th-TH", {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                </Box>
                {showChangePrice === index ? (
                  <Box
                    w="136px"
                    border="1px solid"
                    borderColor="gray.300"
                    boxShadow="2xl"
                    position="absolute"
                    borderRadius="10px"
                    onblur={() => setShowChangePrice(null)}
                    bg="white"
                  >
                    <Text p={1} textStyle="b1" color="black" ml={1}>
                      Change Price
                    </Text>
                    <Box p={1}>
                      <Input
                        border="1px solid"
                        borderColor="gray.400"
                        value={price[index]}
                        type="number"
                        color="black"
                        onChange={(e) => {
                          const newPrice = [...price]; // create a copy of the price array
                          newPrice[index] = e.target.value.toLocaleString(
                            "th-TH",
                            {
                              minimumFractionDigits: 2,
                            }
                          ); // modify the copy
                          setPrice(newPrice); // update the state with the modified copy
                        }}
                        onKeyPress={(event) => {
                          // เช็คว่า key ที่กดเป็น enter และเช็คว่ามีข้อความด้านในไหม
                          if (event.key === "Enter") {
                            changePrice(room.room_type_id, index);
                          }
                        }}
                      />
                    </Box>
                  </Box>
                ) : null}
              </Box>

              <Box>
                <Box
                  w="136px"
                  onClick={() => showPromoPrice(index)}
                  position="relative"
                >
                  <Text textStyle="b1" color="black" ml={5}>
                    {promoPrice[index] && promoPrice[index] > 0 ? (
                      promoPrice[index].toLocaleString("th-TH", {
                        minimumFractionDigits: 2,
                      })
                    ) : (
                      <Text ml={4}>-</Text>
                    )}
                  </Text>
                </Box>
                {showChangePromoPrice === index ? (
                  <Box
                    w="200px"
                    border="1px solid"
                    borderColor="gray.300"
                    boxShadow="2xl"
                    position="absolute"
                    borderRadius="10px"
                    bg="white"
                  >
                    <Text p={1} ml={1} textStyle="b1" color="black">
                      Change PromotionPrice
                    </Text>
                    <Box p={1}>
                      <Input
                        border="1px solid"
                        borderColor="gray.400"
                        value={promoPrice[index]}
                        type="number"
                        color="black"
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
                    </Box>
                  </Box>
                ) : null}
              </Box>

              <Box w="94px">
                <Text textStyle="b1" color="black" ml={5}>
                  {room.amount_person}
                </Text>
              </Box>
              <Box w="167px">
                <Text textStyle="b1" color="black" ml={5}>
                  {room.bed_type[0].toUpperCase() + room.bed_type.slice(1)}
                </Text>
              </Box>
              <Box w="128px">
                <Text textStyle="b1" color="black" ml={5}>
                  {room.room_size}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Flex>
  );
};

export default RoomAndProperty;
