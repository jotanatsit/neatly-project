import React from 'react'
import { Box, Flex, Spacer, Button,Text,Image,} from "@chakra-ui/react";
import { Link } from 'react-scroll'

function Nav_nonuser() {
  return (
    <Flex bg="white" color="black" w="1440px" h="100px" px={150} alignItems="center">
      <Image src="/HomePage/logo.svg"  mr={10} />
      <Flex alignItems="center">
         <Box ml={5}>
             <Link to='content' smooth={true} duration={1000}><Text fontSize="14px" mr={5} cursor="pointer">About Neatly</Text></Link>
         </Box>
         <Box ml={5}>
             <Link to='service' smooth={true} duration={1000}><Text fontSize="14px" mr={5} cursor="pointer"> Service & Facilities</Text></Link>
         </Box>
         <Box ml={5}>
          <Text fontSize="14px" cursor="pointer">Rooms & Suites</Text>
         </Box>
      </Flex>
      <Spacer />
      <Button mr={4} variant="outline" color="orange.500" bg="none" border="none">Login</Button>
      <Button bg="#C14817" color="white" p="16px 32px">Book Now</Button>  
    </Flex>
  )
}

export default Nav_nonuser