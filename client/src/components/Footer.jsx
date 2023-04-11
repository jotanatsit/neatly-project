import { Flex, Image, Box, Text } from "@chakra-ui/react"
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";

import "@fontsource/ibm-plex-sans-thai";

function Footer() {
   return (
      <Flex direction="column" align="center" justify="space-between" bg="green.800" w="1440px" h="485px">
         <Flex pt="66px" justify="space-between" w="1200px" h="fit-content">
            <Flex direction="column" justify="space-between" h="150px" w="383px">
               <Image src="./HomePage/neatly-green-100.svg" w="180px" h="fit-content" />
               <Box>
                  <Text textStyle="h5" color="white">Neatly Hotel</Text>
                  <Text textStyle="b1" color="white">The best hotel for rising your experience</Text>
               </Box>
            </Flex>
            <Flex direction="column" justify="space-between" h="225px" w="383px">
               <Text textStyle="b2" color="white" fontSize="16px">CONTACT</Text>
               <Flex gap="16px">
                  <FiPhone size="20px" mr="16px" color="#81A08F" />
                  <Text textStyle="b1" color="white" fontFamily="IBM Plex Sans Thai">+66 99 999 9999</Text>
               </Flex>
               <Flex gap="16px">
                  <FiMail size="20px" mr="16px" color="#81A08F" />
                  <Text textStyle="b1" color="white" fontFamily="IBM Plex Sans Thai">contact@neatlyhotel.com</Text>
               </Flex>
               <Flex gap="16px">
                  <FiMapPin size="20px" mr="16px" color="#81A08F" />
                  <Text textStyle="b1" color="white" fontFamily="IBM Plex Sans Thai">188 Phaya Thai Rd, Thung Phaya Thai,
                     Ratchathewi, Bangkok 10400</Text>
               </Flex>
            </Flex>
         </Flex>
         <Flex justify="space-between" align="center" w="1200px" h="105px" borderTop="1px solid" borderColor="green.700">
            <Flex justify="space-between" w="96px" h="24px">
               <BsFacebook size="22px" color="white" />
               <RiInstagramFill size="24px" color="white" />
               <BsTwitter size="24px" color="white" />
            </Flex>
            <Text textStyle="b2" fontWeight="500" color="green.300">Copyright ©2022 Neatly Hotel</Text>
         </Flex>
      </Flex>
   )
}

export default Footer