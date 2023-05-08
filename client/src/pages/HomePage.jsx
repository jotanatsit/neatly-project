import React from "react";
import { Flex, Text, Image, Spacer, Box } from "@chakra-ui/react";
import Nav_user from "../Components/Nav_user";
import Nav_nonuser from "../Components/Nav_nonuser";
import Booking_box from "../Components/Booking_box";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import room from "../../data/image_room";
import RoomsAndSuites from "../Components/RoomsAndSuites";
import Testimonial from "../Components/Testimonial";
import Footer from "../Components/Footer";
import { useAuth } from "../contexts/authentication";

function HomePage() {
  const auth = useAuth();

  return (
    <Flex direction="column" w="1440px" m="auto">
      <Box position="fixed" zIndex="10">
        {auth.isAuthenticated ? <Nav_user /> : <Nav_nonuser />}
      </Box>
      <Flex
        w="1440px"
        height={900}
        bg="url(/HomePage/bg-homepage.svg)"
        bgSize="cover"
        flexDirection="column"
        mt="100px"
      >
        <Flex alignItems="center" justifyContent="center">
          <Box
            lineHeight="110px"
            letterSpacing="-2%"
            textAlign="center"
            mt={200}
          >
            <Text textStyle="h1" color="white">
              A Best Place for Your <br />
              Neatly Experience
            </Text>
          </Box>
        </Flex>
        <Spacer />
        <Booking_box />
        <Spacer />
      </Flex>

      <Flex
        w="1440px"
        height={1178}
        flexDirection="column"
        id="content"
        alignItems="center"
      >
        <Flex
          height="50%"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box mr={750}>
            <Text textStyle="h2" textAlign="left" color="green.800">
              Neatly Hotel
            </Text>
          </Box>
          <Box ml={120}>
            <Text textStyle="b2" textAlign="left" mt={8} color="gray.700">
              Set in Bangkok, Thailand. Neatly Hotel offers 5-star accommodation
              with an outdoor pool, kids' club, sports facilities and a <br />{" "}
              fitness centre. There is also a spa, an indoor pool and saunas.
            </Text>
            <Text textStyle="b2" textAlign="left" mt={8} color="gray.700">
              All units at the hotel are equipped with a seating area, a
              flat-screen TV with satellite channels, a dining area and a
              private <br /> bathroom with free toiletries, a bathtub and a
              hairdryer. Every room in Neatly Hotel features a furnished
              balcony. Some rooms <br /> are equipped with a coffee machine.
            </Text>
            <Text textStyle="b2" textAlign="left" mt={8} color="gray.700">
              {" "}
              Free WiFi and entertainment facilities are available at property
              and also rentals are provided to explore the area.
            </Text>
          </Box>
        </Flex>

        <Flex
          height="50%"
          w="1440px"
          alignItems="center"
          justifyContent="center"
          mb={20}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={1}
            slidesPerView={3.5}
            grabCursor={true}
            centeredSlides={true}
            initialSlide={0}
            loop={true}
            navigation={{
              nextEl: ".button-next",
              prevEl: ".button-prev",
              clickable: true,
            }}
          >
            {room.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Image src={item.image} w="400px" h="500px"></Image>
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
      </Flex>

      <Flex
        w="1440px"
        height={480}
        direction="column"
        alignItems="center"
        justifyContent="center"
        bg="green.700"
        id="service"
      >
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Text textStyle="h1" color="white" textAlign="center" mb={6}>
            Service & Facilities
          </Text>
        </Flex>
        <Flex
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt={50}
        >
          <Flex
            mx={3}
            w="144px"
            h="103px"
            flexDirection="column"
            alignItems="center"
          >
            <Image src="/HomePage/icon/icon_spa.svg" boxSize={16} mb={4} />
            <Text textStyle="b1" color="white">
              Restaurant
            </Text>
          </Flex>
          <Flex
            mx={3}
            w="144px"
            h="103px"
            flexDirection="column"
            alignItems="center"
          >
            <Image src="/HomePage/icon/icon_sauna.svg" boxSize={16} mb={4} />
            <Text textStyle="b1" color="white">
              Free Wifi
            </Text>
          </Flex>
          <Flex
            mx={3}
            w="144px"
            h="103px"
            flexDirection="column"
            alignItems="center"
          >
            <Image src="/HomePage/icon/icon_fitness.svg" boxSize={16} mb={4} />
            <Text textStyle="b1" color="white">
              Swimming Pool
            </Text>
          </Flex>
          <Flex
            mx={3}
            w="144px"
            h="103px"
            flexDirection="column"
            alignItems="center"
          >
            <Image src="/HomePage/icon/icon_sofa.svg" boxSize={16} mb={4} />
            <Text textStyle="b1" color="white">
              Kids' Club
            </Text>
          </Flex>
          <Flex
            mx={3}
            w="144px"
            h="103px"
            flexDirection="column"
            alignItems="center"
          >
            <Image src="/HomePage/icon/icon_wifi.svg" boxSize={16} mb={4} />
            <Text textStyle="b1" color="white">
              Bicycle Rental
            </Text>
          </Flex>
          <Flex
            mx={3}
            w="144px"
            h="103px"
            flexDirection="column"
            alignItems="center"
          >
            <Image src="/HomePage/icon/icon_car.svg" boxSize={16} mb={4} />
            <Text textStyle="b1" color="white">
              Shuttle Service
            </Text>
          </Flex>
          <Flex
            mx={3}
            w="144px"
            h="103px"
            flexDirection="column"
            alignItems="center"
          >
            <Image
              src="/HomePage/icon/icon_phone-call.svg"
              boxSize={16}
              mb={4}
            />
            <Text textStyle="b1" color="white">
              Spa &amp; Sauna
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <RoomsAndSuites />
      <Testimonial />
      <Footer />
    </Flex>
  );
}

export default HomePage;
