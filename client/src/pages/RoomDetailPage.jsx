import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Flex,
  Text,
  Image,
  UnorderedList,
  ListItem,
  Box,
} from "@chakra-ui/react";
import Nav_nonuser from "../Components/Nav_nonuser";
import Nav_user from "../Components/Nav_user";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";
import Footer from "../Components/Footer";
import { useAuth } from "../contexts/authentication";
import ExploreRoomButton from "../Components/ExploreRoomButton";
import { useNavigate, useParams } from "react-router-dom";
import { addDays } from "date-fns";

const roomType = [
  {
    roomTypeId: 1,
    roomTypeName: "Deluxe",
    roomTypePicture: "/RoomdetailPage/Deluxe_room.svg",
  },
  {
    roomTypeId: 2,
    roomTypeName: "Superior",
    roomTypePicture: "/RoomdetailPage/Superior_room.svg",
  },
  {
    roomTypeId: 3,
    roomTypeName: "Supreme",
    roomTypePicture: "/HomePage/supreme.svg",
  },
  {
    roomTypeId: 4,
    roomTypeName: "Suite",
    roomTypePicture: "/HomePage/suite.svg",
  },
  {
    roomTypeId: 5,
    roomTypeName: "Superior Garden View",
    roomTypePicture: "/HomePage/superior-garden-view.svg",
  },
  {
    roomTypeId: 6,
    roomTypeName: "Premier Sea View",
    roomTypePicture: "/HomePage/premier-sea-view.svg",
  },
];

const RoomDetailPage = () => {
  const auth = useAuth();
  const params = useParams();
  const [room, setRoom] = useState({});
  const navigate = useNavigate();

  const getRoomById = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/rooms/room-type/${params.roomTypeId}`
      );
      setRoom(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const othersRoom = [];
  let id = Number(params.roomTypeId);

  if (id === 1) {
    othersRoom.push(roomType[1], roomType[2]);
  } else if (id === 2) {
    othersRoom.push(roomType[2], roomType[3]);
  } else if (id === 3) {
    othersRoom.push(roomType[3], roomType[4]);
  } else if (id === 4) {
    othersRoom.push(roomType[4], roomType[5]);
  } else if (id === 5) {
    othersRoom.push(roomType[5], roomType[0]);
  } else if (id === 6) {
    othersRoom.push(roomType[0], roomType[1]);
  }

  useEffect(() => {
    getRoomById();
  }, [params.roomTypeId]);

  // Set ค่า State สำหรับกดปุ่ม Book Now ให้ navigate ไปหน้า booking default
  const [rooms] = useState(1);
  const [guests] = useState(2);
  const [date] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  function handleSubmit() {
    navigate("/booking", { state: { date, rooms, guests } });
  }

  return (
    <Flex flexDirection="column" w="1440px" bgColor="bg" m="auto">
      <Box position="fixed" zIndex="10">
        {auth.isAuthenticated ? <Nav_user /> : <Nav_nonuser />}
      </Box>
      <Flex mt="180px" justify="center">
        <Swiper
          spaceBetween={25}
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
          modules={[Pagination, Navigation]}
        >
          {room.room_picture?.map((imageUrl, index) => {
            return (
              <SwiperSlide key={index}>
                <Flex justify="center">
                  <Image src={imageUrl} />
                </Flex>
              </SwiperSlide>
            );
          })}
          <Flex>
            <Image
              mr="100px"
              boxSize="56px"
              src="/RoomdetailPage/arrow_right.svg"
              className="button-next swiper-button-next"
            />
            <Image
              ml="100px"
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
              {room.room_type_name}
            </Text>
            <Flex
              flexDirection="row"
              h="146px"
              justifyContent="space-between"
              mt="60px"
            >
              <Flex flexDirection="column" justify="space-between">
                <Text textStyle="b1" color="gray.700">
                  {room.description}
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
                    <Text color="gray.800">{room.amount_person}</Text>
                    <Text>Guests</Text>
                  </Flex>
                  <Flex
                    gap="6px"
                    borderRight="1px solid"
                    borderColor="gray.500"
                    pr="16px"
                  >
                    <Text>
                      {room.bed_type?.charAt(0).toUpperCase() +
                        room.bed_type?.slice(1)}
                    </Text>
                  </Flex>
                  <Flex gap="6px">
                    <Text color="gray.800">{room.room_size}</Text>
                    <Text>sqm</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex flexDirection="column" h="146px" justify="space-between">
                <Flex flexDirection="column" w="260px" h="58px" textAlign="end">
                  {room.promotion_price === null ? (
                    <Text textStyle="h5" color="gray.900">
                      THB{" "}
                      {room.price?.toLocaleString("th-TH", {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                  ) : (
                    <Box>
                      <Text textStyle="b1" as="del" color="gray.700">
                        THB{" "}
                        {room.price?.toLocaleString("th-TH", {
                          minimumFractionDigits: 2,
                        })}
                      </Text>
                      <Text textStyle="h5" color="gray.900">
                        THB{" "}
                        {room.promotion_price?.toLocaleString("th-TH", {
                          minimumFractionDigits: 2,
                        })}
                      </Text>
                    </Box>
                  )}
                </Flex>

                <Button
                  type="submit"
                  variant="primary"
                  w="fit-content"
                  alignSelf="end"
                  onClick={handleSubmit}
                >
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
            <Flex>
              <UnorderedList mt="24px" w="300px">
                {room.room_amenity?.slice(0, 7).map((amenity, index) => {
                  return (
                    <ListItem key={index} color="gray.700" textStyle="b1">
                      {amenity.split("_").join(" ").charAt(0).toUpperCase() +
                        amenity.split("_").join(" ").slice(1)}
                    </ListItem>
                  );
                })}
              </UnorderedList>
              <UnorderedList mt="24px" w="300px">
                {room.room_amenity?.slice(7).map((amenity, index) => {
                  return (
                    <ListItem key={index} color="gray.700" textStyle="b1">
                      {amenity.split("_").join(" ").charAt(0).toUpperCase() +
                        amenity.split("_").join(" ").slice(1)}
                    </ListItem>
                  );
                })}
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
            {othersRoom.map((other, index) => {
              return (
                <Flex
                  key={index}
                  bg={`url(${other.roomTypePicture})`}
                  w="548px"
                  h="340px"
                  align="end"
                >
                  <ExploreRoomButton
                    type={other.roomTypeName}
                    pl="60px"
                    pb="49px"
                    roomTypeId={`${other.roomTypeId}`}
                  />
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default RoomDetailPage;
