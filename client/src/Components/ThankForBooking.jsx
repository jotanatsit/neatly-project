import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/react";
import axios from "axios";

function ThankForBooking() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);
  return (
    <Flex direction="column" align="center" w="738px" h="fit-content" mt="80px">
      <Flex
        direction="column"
        justify="space-between"
        align="center"
        w="100%"
        h="210px"
        bg="green.800"
        p="40px 24px"
        borderTopRadius="4px"
      >
        <Text textStyle="h3" color="white" textAlign="center">
          Thank you for booking
        </Text>
        <Text textStyle="b2" color="green.400" textAlign="center">
          We are looking forward to hosting you at our place.
          <br /> We will send you more information about check-in and staying at
          our Neatly
          <br /> closer to your date of reservation
        </Text>
      </Flex>
      <Flex
        direction="column"
        p="24px 40px 40px"
        w="100%"
        gap="40px"
        bg="green.700"
        borderBottomRadius="4px"
      >
        <Flex
          justify="space-between"
          bg="green.600"
          w="100%"
          h="112px"
          p="24px"
          borderRadius="4px"
        >
          <Flex direction="column" justify="space-between">
            <Text textStyle="b1" color="white" fontWeight="600">
              Th, 19 Oct 2022 - Fri, 20 Oct 2022
            </Text>
            <Text textStyle="b1" color="white">
              2 Guests
            </Text>
          </Flex>
          <Flex gap="24px">
            <Flex direction="column" justify="space-between">
              <Text textStyle="b1" color="white" fontWeight="600">
                Check-in
              </Text>
              <Text textStyle="b1" color="white">
                After 2:00 PM
              </Text>
            </Flex>
            <Flex direction="column" justify="space-between">
              <Text textStyle="b1" color="white" fontWeight="600">
                Check-out
              </Text>
              <Text textStyle="b1" color="white">
                Before 12:00 PM
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Text textStyle="b1" fontWeight="600" color="green.300" textAlign="end">
          Payment success via Credit Card - *888
        </Text>
        <Flex w="100%" justify="space-between">
          <Text textStyle="b1" color="green.300" textAlign="start">
            Superior Garden View Room
          </Text>
          <Text textStyle="b1" fontWeight="600" color="white" textAlign="end">
            2,500.00
          </Text>
        </Flex>
        <Flex w="100%" justify="space-between">
          <Text textStyle="b1" color="green.300" textAlign="start">
            Airport tranfer
          </Text>
          <Text textStyle="b1" fontWeight="600" color="white" textAlign="end">
            200.00
          </Text>
        </Flex>
        <Flex
          w="100%"
          justify="space-between"
          align="baseline"
          p="24px 0px 0px"
          borderTop="1px solid"
          borderTopColor="green.600"
        >
          <Text textStyle="b1" color="green.300" textAlign="start">
            Total
          </Text>
          <Text textStyle="h5" color="white" textAlign="end">
            THB 2,300.00
          </Text>
        </Flex>
      </Flex>
      <Flex mt="60px" w="392px" justify="space-between">
        <Button
          variant="ghost"
          onClick={() => {
            navigate("/history");
          }}
        >
          Check Booking Detail
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Home
        </Button>
      </Flex>
    </Flex>
  );
}
export default ThankForBooking;
