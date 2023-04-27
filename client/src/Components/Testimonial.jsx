import { Swiper, SwiperSlide } from "swiper/react";
import { Flex, Text, Image, Box } from "@chakra-ui/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";
function Testimonial() {
  return (
    <Flex justify="center" align="center" w="1440px" h="752px" bg="green.200">
      <Flex
        direction="column"
        justify="space-between"
        align="center"
        w="1080px"
        h="449px"
      >
        <Text textStyle="h2" color="green.800">
          Our Customer Says
        </Text>
        <Flex w="1080px" h="292px">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: ".button-next",
              prevEl: ".button-prev",
              clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {[1, 2, 3].map((id) => {
              return (
                <SwiperSlide key={id}>
                  <Flex justify="center">
                    <Flex
                      direction="column"
                      align="center"
                      justify="space-between"
                      gap="32px"
                    >
                      <Text
                        w="840px"
                        h="188px"
                        textStyle="h5"
                        color="green.700"
                        textAlign="center"
                      >
                        “lorem ipsum dolor sit amet minim mollit non deserunt
                        ullamco est sit aliqua dolor do amet sint, velit
                        official consequat duis enim velit mollit, exercitation
                        minim amet consequat sunt.”
                      </Text>
                      <Flex p="4px" gap="16px" w="fit-content" h="fit-content">
                        <Image
                          boxSize="32px"
                          src="/HomePage/avatar-testimonial.svg"
                        />
                        <Text textStyle="b1" color="gray.700">
                          Katherine, Company®
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </SwiperSlide>
              );
            })}
            <Flex>
              <Image
                top="23px"
                boxSize="56px"
                src="/HomePage/icon/right-arrow-orange.svg"
                className="button-next swiper-button-next"
              />
              <Image
                top="23px"
                boxSize="56px"
                src="/HomePage/icon/left-arrow-orange.svg"
                className="button-prev swiper-button-prev"
              />
            </Flex>
          </Swiper>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Testimonial;
