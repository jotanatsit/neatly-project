import React from 'react'
import { Flex, Text, Image, Spacer, Box } from '@chakra-ui/react'
import Nav_user from '../Components/Nav_user';
import Nav_nonuser from '../Components/Nav_nonuser';
import Booking_box from '../Components/Booking_box';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import room from '../../data/image_room';
import RoomsAndSuits from '../Components/RoomsAndSuits';
import Testimonial from "../Components/Testimonial"
import Footer from '../components/Footer';

function HomePage() {
   return (
      <>
         <Nav_nonuser />
         <Flex w="1440px" height={900} bg="url(/HomePage/bg-homepage.svg)" bgSize="cover" flexDirection="column">
            <Flex alignItems="center" justifyContent="center" >
               <Box color="white" fontFamily="Noto Serif" fontWeight={500} fontSize="88px" lineHeight="110px" letterSpacing="-2%" textAlign="center" mt={200}>
                  <h1>A Best Place for Your <br />Neatly Experience</h1>
               </Box>
            </Flex>
            <Spacer />
            <Booking_box />
            <Spacer />
         </Flex>

         <Flex w="1440px" height={1178} flexDirection="column" id='content' alignItems="center">
            <Flex height="50%" alignItems="center" justifyContent="center" flexDirection="column">
               <Box mr={800}>
                  <Text fontFamily="Noto Serif" fontSize="68px" fontWeight={500} lineHeight="85px" letterSpacing="-0.02em" textAlign="left" color="black">Neatly Hotel</Text>
               </Box>
               <Box ml={120}>
                  <Text fontFamily="Inter" fontSize="16px" fontWeight={400} lineHeight="24px" letterSpacing="-0.02em" textAlign="left" mt={8} color="#646D89">
                     Set in Bangkok, Thailand. Neatly Hotel offers 5-star accommodation with an outdoor pool, kids' club, sports facilities and a <br /> fitness centre. There is also a spa, an indoor pool and saunas.
                  </Text>
                  <Text fontFamily="Inter" fontSize="16px" fontWeight={400} lineHeight="24px" letterSpacing="-0.02em" textAlign="left" mt={8} color="#646D89">All units at the hotel are equipped with a seating area, a flat-screen TV with satellite channels, a dining area and a private <br /> bathroom with free toiletries, a bathtub and a hairdryer. Every room in Neatly Hotel features a furnished balcony. Some rooms <br /> are equipped with a coffee machine.</Text>
                  <Text fontFamily="Inter" fontSize="16px" fontWeight={400} lineHeight="24px" letterSpacing="-0.02em" textAlign="left" mt={8} color="#646D89"> Free WiFi and entertainment facilities are available at property and also rentals are provided to explore the area.</Text>
               </Box>
            </Flex>
            <Flex height="50%" w="1440px" alignItems="center" justifyContent="center" mb={20} >
               <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={1}
                  slidesPerView={3.5}
                  grabCursor={true}
                  centeredSlides={true}
                  initialSlide={2}
                  loop={true}
                  navigation={{
                     nextEl: '.button-next',
                     prevEl: '.button-prev',
                     clickable: true,
                  }}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
               >
                  {room.map((item, index) => {
                     return (
                        <SwiperSlide key={index}>
                           <Image src={item.image} w="400px" h="500px"></Image>
                        </SwiperSlide>
                     )
                  })}
                  <Flex>
                     <Box>
                        <Image w="50px" ml={120} src='/HomePage/icon/left-arrow.svg' className='button-prev swiper-button-prev' ></Image>
                     </Box>
                     <Box>
                        <Image w="50px" mr={120} src='/HomePage/icon/right-arrow.svg' className='button-next swiper-button-next'></Image>
                     </Box>
                  </Flex>
               </Swiper>
            </Flex>
         </Flex>

         <Flex w="1440px" height={480} direction="column" alignItems="center" justifyContent="center" bg="#465C50" id='service'>
            <Flex direction="column" alignItems="center" justifyContent="center">
               <Text fontWeight={500} fontSize={68} color="white" fontFamily="Noto Serif" lineHeight="85px" letterSpacing="-0.02em" textAlign="center" mb={6}>Service & Facilities</Text>
            </Flex>
            <Flex direction="row" justifyContent="center" alignItems="center" mt={50}>
               <Flex mx={3} w="144px" h="103px" flexDirection="column" alignItems="center" >
                  <Image src='/HomePage/icon/icon_spa.svg' boxSize={16} mb={4} />
                  <Text fontSize="md" color="white">Restaurant</Text>
               </Flex>
               <Flex mx={3} w="144px" h="103px" flexDirection="column" alignItems="center" >
                  <Image src='/HomePage/icon/icon_sauna.svg' boxSize={16} mb={4} />
                  <Text fontSize="md" color="white">Free Wifi</Text>
               </Flex>
               <Flex mx={3} w="144px" h="103px" flexDirection="column" alignItems="center" >
                  <Image src='/HomePage/icon/icon_fitness.svg' boxSize={16} mb={4} />
                  <Text fontSize="md" color="white">Swimming Pool</Text>
               </Flex>
               <Flex mx={3} w="144px" h="103px" flexDirection="column" alignItems="center" >
                  <Image src='/HomePage/icon/icon_sofa.svg' boxSize={16} mb={4} />
                  <Text fontSize="md" color="white">Kids' Club</Text>
               </Flex>
               <Flex mx={3} w="144px" h="103px" flexDirection="column" alignItems="center">
                  <Image src='/HomePage/icon/icon_wifi.svg' boxSize={16} mb={4} />
                  <Text fontSize="md" color="white">Bicycle Rental</Text>
               </Flex>
               <Flex mx={3} w="144px" h="103px" flexDirection="column" alignItems="center" >
                  <Image src='/HomePage/icon/icon_car.svg' boxSize={16} mb={4} />
                  <Text fontSize="md" color="white">Shuttle Service</Text>
               </Flex>
               <Flex mx={3} w="144px" h="103px" flexDirection="column" alignItems="center" >
                  <Image src='/HomePage/icon/icon_phone-call.svg' boxSize={16} mb={4} />
                  <Text fontSize="md" color="white">Spa &amp; Sauna</Text>
               </Flex>
            </Flex>
         </Flex>
         <RoomsAndSuits />
         <Testimonial />
         <Footer />
      </>
   )
}

export default HomePage