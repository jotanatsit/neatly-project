import React from "react";
import {
  Button,
  Flex,
  Text,
  Image,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import Nav_nonuser from "../Components/Nav_nonuser";
import Nav_user from "../Components/Nav_user";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/authentication";
import ExploreRoomButton from "../Components/ExploreRoomButton";

const RoomDetailPage = () => {
  const auth = useAuth();
  return (
    <Flex flexDirection="column" w="1440px" bgColor="bg">
      {auth.isAuthenticated ? <Nav_user /> : <Nav_nonuser />}
      <Flex mt="80px" justify="center">
        <Swiper
          slidesPerView={1.5}
          centeredSlides={true}
          initialSlide={1}
          rewind={true}
          navigation={{
            nextEl: ".button-next",
            prevEl: ".button-prev",
            clickable: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
        >
          <SwiperSlide>
            <Image src="RoomdetailPage/room_slider1.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="RoomdetailPage/room_slider2.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="RoomdetailPage/room_slider3.svg" />
          </SwiperSlide>

          <Flex w="1120px" justify="center">
            <Image
              mr="150px"
              boxSize="56px"
              src="/RoomdetailPage/arrow_right.svg"
              className="button-next swiper-button-next"
            />
            <Image
              ml="120px"
              boxSize="56px"
              src="/RoomdetailPage/arrow_left.svg"
              className="button-prev swiper-button-prev"
            />
          </Flex>
        </Swiper>
      </Flex>

      <Flex direction="column" align="center" h="935px">
        <Flex
          flexDirection="column"
          justify="space-between"
          w="738px"
          h="633px"
          mt={85}
        >
          <Flex flexDirection="column" h="291px" justifyContent="space-between">
            <Text textStyle="h2" color="green.800">
              Superior Garden View
            </Text>
            <Flex
              flexDirection="row"
              h="146px"
              justifyContent="space-between"
              mt="60px"
            >
              <Flex flexDirection="column" gap="60px">
                <Text textStyle="b1" color="gray.700">
                  Rooms (36sqm) with full garden views, 1 single bed,
                  <br /> bathroom with bathtub & shower.
                </Text>
                <Flex
                  flexDirection="row"
                  textStyle="b1"
                  color="gray.700"
                  gap="16px"
                >
                  <Flex
                    gap="6px"
                    borderRight="1px solid"
                    borderColor="gray.500"
                    pr="16px"
                  >
                    <Text color="gray.800">2</Text>
                    <Text>Guests</Text>
                  </Flex>
                  <Flex
                    gap="6px"
                    borderRight="1px solid"
                    borderColor="gray.500"
                    pr="16px"
                  >
                    <Text color="gray.800">1</Text>
                    <Text>Double bed</Text>
                  </Flex>
                  <Flex gap="6px">
                    <Text color="gray.800">32</Text>
                    <Text>sqm</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex flexDirection="column" gap="40px">
                <Flex flexDirection="column" w="260px" h="58px" textAlign="end">
                  <Text textStyle="b1" as="del" color="gray.700">
                    THB 3,100.00
                  </Text>
                  <Text textStyle="h5" color="gray.900">
                    THB 2,500.00
                  </Text>
                </Flex>

                <Button variant="primary" w="fit-content" alignSelf="end">
                  Book Now
                </Button>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            direction="column"
            h="262px"
            borderTop="1px solid"
            borderColor="gray.300"
          >
            <Text textStyle="h5" color="black" mt="40px">
              Room Amenities
            </Text>
            <Flex gap="24px">
              <UnorderedList mt="24px" w="300px">
                <ListItem color="gray.700" textStyle="b1">
                  Safe in Room
                </ListItem>
                <ListItem color="gray.700" textStyle="b1">
                  Air Conditioning
                </ListItem>
                <ListItem color="gray.700" textStyle="b1">
                  High speed internet connection
                </ListItem>
                <ListItem color="gray.700" textStyle="b1">
                  Hairdryer
                </ListItem>
                <ListItem color="gray.700" textStyle="b1">
                  Shower
                </ListItem>
                <ListItem color="gray.700" textStyle="b1">
                  Bathroom amenities
                </ListItem>
                <ListItem color="gray.700" textStyle="b1">
                  Lamp
                </ListItem>
              </UnorderedList>
              <UnorderedList mt="24px" w="300px">
                <ListItem color="gray.700" textStyle="b1">
                  Minibar
                </ListItem>
                <ListItem color="gray.700" textStyle="b1">
                  Telephone
                </ListItem>
                <ListItem color="gray.700" textStyle="b1">
                  Ironing board
                </ListItem>
                <ListItem color="gray.700" textStyle="b1">
                  A floor only accessible via a guest room key
                </ListItem>
                <ListItem color="gray.700" textStyle="b1">
                  Alarm clock
                </ListItem>
                <ListItem color="gray.700" textStyle="b1">
                  Bathrobe
                </ListItem>
              </UnorderedList>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex bg="green.200" h="662px" justify="center" align="center">
        <Flex
          w="1120px"
          h="455px"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Text textStyle="h3" color="green.800" textAlign="center">
            Other Rooms
          </Text>
          <Flex flexDirection="row" justifyContent="space-between">
            <Flex
              bg="url(/RoomdetailPage/Deluxe_room.svg)"
              w="548px"
              h="340px"
              align="end"
            >
              <ExploreRoomButton type="Deluxe" pl="60px" pb="49px" />
            </Flex>
            <Flex
              bg="url(/RoomdetailPage/Superior_room.svg)"
              w="548px"
              h="340px"
              align="end"
            >
              <ExploreRoomButton type="Superior" pl="60px" pb="49px" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default RoomDetailPage;
