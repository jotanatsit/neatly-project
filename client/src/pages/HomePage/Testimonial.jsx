import { Swiper, SwiperSlide } from "swiper/react";
import { Flex } from "@chakra-ui/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import { Autoplay, Pagination, Navigation } from "swiper";
function Testimonial() {
   return (
      <Flex width="1080px">
         <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
               delay: 8000,
               disableOnInteraction: false,
            }}
            pagination={{
               clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
         >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
         </Swiper>
      </Flex>
   )
};

export default Testimonial