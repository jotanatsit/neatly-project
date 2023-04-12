import React, { useState } from "react";
import {
  Button,
  Flex,
  Text,
  Image,
  Input,
  Spacer,
  Box,
  InputGroup,
  InputLeftAddon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Select,
} from "@chakra-ui/react";
import Nav_nonuser from "../Components/Nav_nonuser";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  EffectCoverflow,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper";
import "swiper/swiper-bundle.min.css";
import room from "../../data/image_room";
import Footer from "../components/Footer";

const RoomDetailPage = () => {
  return (
    <Flex flexDirection="column" w="1440px">
      <Nav_nonuser />
      <Flex w="1440px" h="1596px" flexDirection="column" alignItems="center">
        <Flex
          w="1440px"
          overflow="hidden"
          flexDirection="row"
          mt={20}
          justifyContent="center"
        >
          <Image
            src="/RoomdetailPage/room_slider1.svg"
            w="930px"
            h="581px"
            mr={4}
          />
          <Image
            src="/RoomdetailPage/room_slider2.svg"
            w="930px"
            h="581px"
            mr={4}
          />
          <Image
            src="/RoomdetailPage/room_slider3.svg"
            w="930px"
            h="581px"
            mr={4}
          />
        </Flex>

        <Flex flexDirection="column" w="738px" h="633px" mt={85}>
          <Flex flexDirection="column" h="291px" justifyContent="space-between">
            <Box h="85px">
              <Text textStyle="h2" color="green.800">
                Superior Garden View
              </Text>
            </Box>

            <Flex flexDirection="row" h="146px" justifyContent="space-between">
              <Flex flexDirection="column" justifyContent="space-between">
                <Text fontFamily="Inter">
                  Rooms (36sqm) with full garden views, 1 single bed,
                  <br /> bathroom with bathtub & shower.
                </Text>

                <Flex flexDirection="row" mt="10px" fontFamily="Inter">
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

              <Flex flexDirection="column" justifyContent="space-between">
                <Flex
                  flexDirection="column"
                  w="260px"
                  h="58px"
                  textAlign="end"
                  fontFamily="Inter"
                >
                  <Text as="del">THB 3,100.00</Text>
                  <Text fontSize="20px">THB 2,500.00</Text>
                </Flex>
                <Flex justifyContent="flex-end">
                  <Button bg="#C14817" color="white" p="16px 32px">
                    Book Now
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        w="1440px"
        h="662"
        bg="#E6EBE9"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          w="1120px"
          h="455px"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Text
            textStyle="h3"
            color="green.800"
            w="100%"
            textAlign="center"
            h="80px"
          >
            Other Rooms
          </Text>

          <Flex flexDirection="row" justifyContent="space-between">
            <Box bg="url(/RoomdetailPage/Deluxe_room.svg)" w="548px" h="340px">
              <Box w="148px" h="103px" mt="180px" ml="60px">
                <Text textStyle="h3" color="white">
                  Deluxe
                </Text>
                <Button bg="none" color="white">
                  Explore Room
                </Button>
              </Box>
            </Box>
            <Box
              bg="url(/RoomdetailPage/Superior_room.svg)"
              w="548px"
              h="340px"
            >
              <Box w="148px" h="103px" mt="180px" ml="60px">
                <Text textStyle="h3" color="white">
                  Deluxe
                </Text>
                <Button bg="none" color="white">
                  Explore Room
                </Button>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default RoomDetailPage;
