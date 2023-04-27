import { Flex, Text } from "@chakra-ui/react";
import Nav_user from "../Components/Nav_user";
import StepPayment from "../Components/StepPayment";
import PackageSummary from "../Components/PackageSummary.jsx";
import BasicInfoSummary from "../Components/BasicInfoSummary.jsx";
import SpecialRequest from "../Components/SpecialRequest";
import PaymentMethod from "../Components/PaymentMethod";

function BookingSummary() {
  return (
    <Flex direction="column" w="1440px" bgColor="bg" m="auto">
      <Nav_user />
      <Flex h="1287px" justify="center">
        <Flex direction="column" w="1122px" mt="80px">
          <Text textStyle="h2" color="black" ml="3px">
            Booking Room
          </Text>
          <Flex
            align="center"
            w="1119px"
            h="146px"
            ml="3px"
            gap="60px"
            p="40px 0px"
            borderBottom="1px solid"
            borderColor="gray.300"
          >
            <StepPayment status="finish" step={1} title="Basic Information" />
            <StepPayment status="current" step={2} title="Special Request" />
            <StepPayment status="none" step={3} title="Payment Method" />
          </Flex>
          <Flex mt="40px" gap="24px">
            {/* <BasicInfoSummary /> */}
            {/* <SpecialRequest /> */}
            <PaymentMethod />
            <PackageSummary />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default BookingSummary;
