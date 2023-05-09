import { useState } from "react";
import { Box, Flex, Spacer, Button, Text, Image } from "@chakra-ui/react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addDays } from "date-fns";

function Nav_nonuser() {
  // Set ค่า State สำหรับกดปุ่ม Book Now ให้ navigate ไปหน้า booking default
  const [rooms] = useState(1);
  const [guests] = useState(1);
  const [date] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();
  function handleSubmit() {
    navigate("/booking", { state: { date, rooms, guests } });
  }

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
      {window.location.pathname === "/" ? (
        <Flex flexGrow={1} alignItems="center">
          <Box ml={8}>
            <Link to="content" smooth={true} duration={1000}>
              <Text textStyle="b2" mr={5} cursor="pointer">
                About Neatly
              </Text>
            </Link>
          </Box>
          <Box ml={8}>
            <Link to="service" smooth={true} duration={1000}>
              <Text textStyle="b2" mr={5} cursor="pointer">
                Service & Facilities
              </Text>
            </Link>
          </Box>
          <Box ml={8}>
            <Link to="room-type" smooth={true} duration={1000}>
              <Text textStyle="b2" mr={5} cursor="pointer">
                Rooms & Suite
              </Text>
            </Link>
          </Box>
        </Flex>
      ) : (
        <Flex flexGrow={1} alignItems="center">
          <Box ml={8}>
            <RouterLink to="/">
              <Text textStyle="b2" mr={5} cursor="pointer">
                About Neatly
              </Text>
            </RouterLink>
          </Box>
          <Box ml={8}>
            <RouterLink to="/">
              <Text textStyle="b2" mr={5} cursor="pointer">
                Service & Facilities
              </Text>
            </RouterLink>
          </Box>
          <Box ml={8}>
            <RouterLink to="/">
              <Text textStyle="b2" mr={5} cursor="pointer">
                Rooms & Suite
              </Text>
            </RouterLink>
          </Box>
        </Flex>
      )}
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
      <Button variant="primary" p="16px 32px" onClick={handleSubmit}>
        Book Now
      </Button>
    </Flex>
  );
}

export default Nav_nonuser;
