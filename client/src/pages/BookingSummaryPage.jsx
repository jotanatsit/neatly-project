import { useState, useEffect } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import Nav_user from "../Components/Nav_user";
import StepPayment from "../Components/StepPayment";
import BasicInfoSummary from "../Components/BasicInfoSummary.jsx";
import SpecialRequest from "../Components/SpecialRequest";
import PaymentMethod from "../Components/PaymentMethod";
import ThankForBooking from "./ThankForBookingPage";
import PackageSummary from "../Components/PackageSummary.jsx";
import Payment from "../Components/Payment";
import { useBooking } from "../contexts/booking";

function BookingSummary() {
  /* const [status, setStatus] = useState(["current", "none", "none"]); */

  // useBooking() เป็น context ที่เกี่ยวกับการเก็บข้อมูลการ Booking
  const { resetBookingData, step, setStepPayment, resetStepPayment } =
    useBooking();
  useEffect(() => resetBookingData(), []);
  useEffect(() => resetStepPayment(), []);

  function nextStep() {
    if (step[0] === "current") {
      setStepPayment(["finish", "current", "none"]);
    } else if (step[1] === "current") {
      setStepPayment(["finish", "finish", "current"]);
    }
  }

  function backStep() {
    if (step[2] === "current") {
      setStepPayment(["finish", "current", "none"]);
    } else if (step[1] === "current") {
      setStepPayment(["current", "none", "none"]);
    }
  }

  return (
    <Flex direction="column" w="1440px" bgColor="bg" m="auto" h="100%">
      <Nav_user />
      <Flex h="fit-content" justify="center" pb="106px">
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
            <StepPayment status={step[0]} step={1} title="Basic Information" />
            <StepPayment status={step[1]} step={2} title="Special Request" />
            <StepPayment status={step[2]} step={3} title="Payment Method" />
          </Flex>
          <Flex direction="column" mt="40px">
            <Flex gap="24px">
              {step[0] === "current" ? <BasicInfoSummary /> : null}
              {step[1] === "current" ? <SpecialRequest /> : null}
              {step[2] === "current" ? <Payment /> : null}
              <PackageSummary />
            </Flex>
            {step[2] === "current" ? null : (
              <Flex
                w="740px"
                p="40px"
                bg="white"
                justify="space-between"
                border="1px solid"
                borderTop="none"
                borderColor="gray.300"
                borderBottomRadius="4px"
              >
                {step[0] === "current" ? (
                  <Button variant="ghost" isDisabled>
                    Back
                  </Button>
                ) : (
                  <Button variant="ghost" onClick={backStep}>
                    Back
                  </Button>
                )}

                <Button variant="primary" onClick={nextStep}>
                  Next
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default BookingSummary;
