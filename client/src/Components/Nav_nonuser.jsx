import React from "react";
import { Box, Flex, Spacer, Button, Text, Image } from "@chakra-ui/react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

function Nav_nonuser() {
  return (
    <Flex
      bg="white"
      color="black"
      w="1440px"
      h="100px"
      px={150}
      alignItems="center"
      borderBottom="2px solid"
      borderColor="gray.300"
    >
      <RouterLink to="/">
        <Image src="/HomePage/logo.svg" w="167px" h="45px" mr={10} />
      </RouterLink>
      <Flex alignItems="center">
        <Box ml={5}>
          <Link to="content" smooth={true} duration={1000}>
            <Text textStyle="b2" mr={5} cursor="pointer">
              About Neatly
            </Text>
          </Link>
        </Box>
        <Box ml={5}>
          <Link to="service" smooth={true} duration={1000}>
            <Text textStyle="b2" mr={5} cursor="pointer">
              Service & Facilities
            </Text>
          </Link>
        </Box>
        <Box ml={5}>
          <Link to="room-type" smooth={true} duration={1000}>
            <Text textStyle="b2" mr={5} cursor="pointer">
              Rooms & Suites
            </Text>
          </Link>
        </Box>
      </Flex>
      <Spacer />
      <RouterLink to="/login">
        <Button
          mr={4}
          variant="outline"
          color="orange.500"
          bg="none"
          border="none"
        >
          Login
        </Button>
      </RouterLink>
      <RouterLink to="/booking">
        <Button variant="primary" p="16px 32px">
          Book Now
        </Button>
      </RouterLink>
    </Flex>
  );
}

export default Nav_nonuser;
