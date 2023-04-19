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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import { Link } from "react-router-dom";
import room from "../../data/image_room";

function SearchRooms({ item }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  return (
    <Flex
      width={1120}
      borderBottom="1px solid gray"
      height={400}
      mt={2}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box w="453px" position="relative">
        <Image
          src={item.photo[0]}
          w={453}
          h={320}
          objectFit="cover"
        ></Image>
        <Image src="/BookingPage/icon_see image.svg" position="absolute" bottom={0} zIndex={1} onClick={onOpen} cursor="pointer"/>
      </Box>

      <Flex w={619} h={320} flexDirection="column" alignItems="end">
        <Flex
          w={602}
          h={186}
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
                {item.name}
              </Text>
              <Flex flexDirection="row" mt="10px">
                <Text
                  fontSize="16px"
                  borderRight="1px solid"
                  paddingRight="5px"
                >
                  2 Guests
                </Text>
                <Text
                  fontSize="16px"
                  borderRight="1px solid"
                  paddingRight="5px"
                >
                  1 Double bed
                </Text>
                <Text
                  fontSize="16px"
                  borderRight="1px solid"
                  paddingRight="5px"
                >
                  32 sqm
                </Text>
              </Flex>
            </Flex>
            <Flex>
              <Text>
                Rooms (36sqm) with full garden views, 1 single bed, bathroom
                with bathtub & shower.
              </Text>
            </Flex>
          </Flex>

          <Flex w="260px" h="186px" flexDirection="column">
            <Flex flexDirection="column" w="260px" h="58px" textAlign="end">
              <Text as="del">THB 3,100.00</Text>
              <Text textStyle="h5" color="black">
                THB 2,500.00
              </Text>
            </Flex>
            <Flex
              flexDirection="column"
              w="260px"
              h="58px"
              textAlign="end"
              mt="5"
            >
              <Text>Per Night</Text>
              <Text>(Including Taxes & Fees)</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex mt="10">
          <Button onClick={onOpen2} bg="none" color="orange.600" p="16px 32px">
            Room Detail
          </Button>

          <Button variant="primary" p="16px 32px">
            Book Now
          </Button>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="700px" maxW="1440px" style={{ left: "-240px" }}>
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
                {item.photo.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Image
                        src={item}
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
        <ModalContent h="840px" maxW="800px" style={{ left: "-235px" }}>
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
                  {item.photo.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Image
                          src={item}
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
              <Box mt={10} w="640px">
                <Box display="flex">
                  {item.type.map((item, index) => {
                    return (
                      <Box display="flex" flexDirection="row" key={index}>
                        <Text textStyle="b1">{item[0]} |</Text>
                        <Text textStyle="b1">{item[1]}</Text>
                        <Text textStyle="b1">{item[2]}</Text>
                      </Box>
                    );
                  })}
                </Box>
                <Text mt={3} textStyle="b1">
                  {item.detail}
                </Text>
              </Box>
              <Flex w="640px" flexDirection="column" mt={10}>
                <Text textStyle="b1" color="black">
                  Room Amenities
                </Text>
                <Flex w="640px" mt={3} ml={5}>
                  <Box w="50%">
                    <ul>
                      <li>Safe in Room</li>
                      <li>Air Conditioning</li>
                      <li>High speed internet connection</li>
                      <li>Hairdryer Shower</li>
                      <li>Bathroom amenities</li>
                      <li>Lamp</li>
                    </ul>
                  </Box>
                  <Box w="50%">
                    <li>Safe in Room</li>
                    <li>Air Conditioning</li>
                    <li>High speed internet connection</li>
                    <li>Hairdryer Shower</li>
                    <li>Bathroom amenities</li>
                    <li>Lamp</li>
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
