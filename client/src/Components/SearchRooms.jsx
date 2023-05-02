import React, { useState } from "react";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Badge,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import { useAuth } from "../contexts/authentication";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SearchRooms(props) {
  const auth = useAuth();
  const rooms = props.rooms;
  const room = props.room;
  const room_type_id = props.room_type_id;
  const guests = props.guests;
  const startDate = props.checkInDate;
  const endDate = props.checkOutDate;
  const navigate = useNavigate();
  const [roomDetail, setRoomDetail] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  // function ที่ส่ง state จากหน้า booking ไป หน้า booking summary
  function handleBooking() {
    const netPrice =
      room.promotion_price === null ? room.price : room.promotion_price;

    if (auth.isAuthenticated) {
      const bookingData = {
        user_id: auth.UserIdFromLocalStorage,
        room_type_id: room.room_type_id,
        room_type_name: room.room_type_name,
        check_in_date: startDate,
        check_out_date: endDate,
        amount_rooms: rooms,
        amount_guests: guests,
        total_price_per_room: netPrice,
      };

      // Navigate to /booking-summary and pass bookingData as state
      navigate("/booking-summary", { state: bookingData });
    } else {
      // Navigate to login page
      navigate("*");
    }
  }

  async function getRoomdetail(room_type_id) {
    try {
      const response = await axios.get(
        `http://localhost:4000/rooms/room-type/${room_type_id}`
      );

      setRoomDetail(response.data.data);
      onOpen2(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex
      width="1120px"
      height="362px"
      flexDirection="row"
      alignrooms="center"
      justifyContent="space-between"
      borderBottom="1px solid"
      borderColor="gray.400"
      pb="41px"
      mt={10}
    >
      <Box w="453px" position="relative">
        <Image
          src={room.room_picture[0]}
          w={453}
          h={320}
          objectFit="cover"
        ></Image>
        <Image
          src="/BookingPage/icon_see image.svg"
          position="absolute"
          bottom={0}
          zIndex={1}
          onClick={onOpen}
          cursor="pointer"
        />
      </Box>

      <Flex w={619} h={320} flexDirection="column" alignrooms="end">
        <Flex
          w={602}
          h={500}
          flexDirection="row"
          justifyContent="space-between"
          mt="5"
        >
          <Flex
            flexDirection="column"
            w={314}
            h={178}
            justifyContent="space-between"
          >
            <Flex flexDirection="column">
              <Text textStyle="h4" color="black">
                {room.room_type_name[0].toUpperCase() +
                  room.room_type_name.slice(1)}
              </Text>
              <Flex flexDirection="row" mt="10px">
                <Box pr={2}>
                  <Text textStyle="b1" color="gray.700" paddingRight="5px">
                    {room.amount_person} Guests
                  </Text>
                </Box>
                <Box borderX="1px solid" borderColor="gray.500" px={2}>
                  <Text textStyle="b1" color="gray.700" paddingRight="5px">
                    {room.bed_type[0].toUpperCase() + room.bed_type.slice(1)}
                  </Text>
                </Box>
                <Box pl={2}>
                  <Text textStyle="b1" color="gray.700" paddingRight="5px">
                    {room.room_size} sqm
                  </Text>
                </Box>
              </Flex>
            </Flex>
            <Flex mt={7}>
              <Text textStyle="b1" color="gray.700">
                {room.description}
              </Text>
            </Flex>
          </Flex>

          <Flex w="260px" h="186px" flexDirection="column" mt={2}>
            <Flex flexDirection="column" w="260px" h="58px" textAlign="end">
              {room.promotion_price === null ? (
                <>
                  <Text textStyle="h5" color="black">
                    THB{" "}
                    {room.price.toLocaleString("th-TH", {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                </>
              ) : (
                <>
                  <Text as="del" textStyle="b1" color="gray.700">
                    THB{" "}
                    {room.price.toLocaleString("th-TH", {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                  <Text textStyle="h5" color="black">
                    THB{" "}
                    {room.promotion_price.toLocaleString("th-TH", {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                </>
              )}
            </Flex>

            <Flex
              flexDirection="column"
              w="260px"
              h="58px"
              textAlign="end"
              mt="5"
            >
              <Text textStyle="b1" color="gray.700">
                Per Night
              </Text>
              <Text textStyle="b1" color="gray.700">
                (Including Taxes & Fees)
              </Text>
            </Flex>
            <Flex justifyContent="flex-end" mt={20} mb={3} mr={1}>
              <Text variant="solid" color="green" fontSize={15}>
                Available {room.available_room} rooms
              </Text>
            </Flex>
            <Flex justifyContent="flex-end">
              <Button
                onClick={() => {
                  getRoomdetail(room_type_id);
                }}
                bg="none"
                color="orange.600"
                p="16px 32px"
              >
                Room Detail
              </Button>

              {rooms <= room.available_room ? (
                <Button variant="primary" p="16px 32px" onClick={handleBooking}>
                  Book Now
                </Button>
              ) : (
                // If search room > available room , button is diable
                <Button variant="primary" p="16px 32px" isDisabled>
                  Book Now
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="700px" maxW="1440px" style={{ left: "-6px" }}>
          <ModalHeader bg="black" pt={8}>
            <ModalCloseButton color="white" />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0} bg="black">
            <Flex height="600px" w="1440px">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={1.5}
                grabCursor={true}
                centeredSlides={true}
                initialSlide={0}
                loop={true}
                navigation={{
                  nextEl: ".button-next",
                  prevEl: ".button-prev",
                  clickable: true,
                }}
                pagination={{
                  clickable: true,
                }}
              >
                {room.room_picture.map((room, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Image
                        src={room}
                        boxSize="100%"
                        objectFit="cover"
                        borderRadius="10px"
                      ></Image>
                    </SwiperSlide>
                  );
                })}
                <Flex>
                  <Box>
                    <Image
                      w="50px"
                      ml={120}
                      src="/HomePage/icon/left-arrow.svg"
                      className="button-prev swiper-button-prev"
                    ></Image>
                  </Box>
                  <Box>
                    <Image
                      w="50px"
                      mr={120}
                      src="/HomePage/icon/right-arrow.svg"
                      className="button-next swiper-button-next"
                    ></Image>
                  </Box>
                </Flex>
              </Swiper>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent h="840px" maxW="800px" style={{ left: "-6px" }}>
          <ModalHeader p={0}>
            <Flex w="800px" h="400px" justifyContent="center" mt={5}>
              <Box w="600px" borderRadius="10px" overflow="hidden">
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={1}
                  slidesPerView={1}
                  grabCursor={true}
                  centeredSlides={true}
                  initialSlide={0}
                  loop={true}
                  navigation={{
                    nextEl: ".button-next",
                    prevEl: ".button-prev",
                    clickable: true,
                  }}
                  pagination={{
                    dynamicBullets: true,
                  }}
                >
                  {roomDetail?.room_picture?.map((picture, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Image
                          src={picture}
                          w="640px"
                          h="400px"
                          objectFit="cover"
                          borderRadius="10px"
                        ></Image>
                      </SwiperSlide>
                    );
                  })}

                  <Flex>
                    <Box>
                      <Image
                        w="50px"
                        ml={5}
                        src="/HomePage/icon/left-arrow.svg"
                        className="button-prev swiper-button-prev"
                      ></Image>
                    </Box>
                    <Box>
                      <Image
                        w="50px"
                        mr={5}
                        src="/HomePage/icon/right-arrow.svg"
                        className="button-next swiper-button-next"
                      ></Image>
                    </Box>
                  </Flex>
                </Swiper>
              </Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0}>
            <Flex w="800px" flexDirection="column" alignItems="center">
              <Box
                mt={10}
                w="640px"
                borderBottom="1px solid"
                borderColor="gray.200"
                pb={5}
              >
                <Box display="flex">
                  <Box display="flex" flexDirection="row">
                    <Box pr={2}>
                      <Text textStyle="b1" color="gray.700" paddingRight="5px">
                        {roomDetail?.amount_person} Person
                      </Text>
                    </Box>
                    <Box borderX="1px solid" borderColor="gray.500" px={2}>
                      <Text textStyle="b1" color="gray.700" paddingRight="5px">
                        {roomDetail?.bed_type}
                      </Text>
                    </Box>
                    <Box pl={2}>
                      <Text textStyle="b1" color="gray.700" paddingRight="5px">
                        {roomDetail?.room_size} sqm
                      </Text>
                    </Box>
                  </Box>
                </Box>

                <Text mt={3} textStyle="b1" color="gray.700">
                  {roomDetail?.description}
                </Text>
              </Box>
              <Flex w="640px" flexDirection="column" mt={5}>
                <Text textStyle="b1" color="black">
                  Room Amenities
                </Text>
                <Flex w="640px" mt={3} ml={5}>
                  <Box w="47%">
                    <ul>
                      {roomDetail &&
                        roomDetail.room_amenity &&
                        roomDetail.room_amenity.map((item, index) => {
                          return (
                            <li key={index}>
                              <Text textStyle="b1" color="gray.700">
                                {item.split("_").join(" ")}
                              </Text>
                            </li>
                          );
                        })}
                    </ul>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default SearchRooms;
