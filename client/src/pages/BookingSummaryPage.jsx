import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Flex, Text, Button, Box } from "@chakra-ui/react";
import Nav_user from "../Components/Nav_user";
import StepPayment from "../Components/StepPayment";
import BasicInfoSummary from "../Components/BasicInfoSummary.jsx";
import SpecialRequest from "../Components/SpecialRequest";
import PackageSummary from "../Components/PackageSummary.jsx";
import Payment from "../Components/Payment";
import { useBooking } from "../contexts/booking";

function BookingSummary() {
  // useBooking() เป็น context ที่เกี่ยวกับการเก็บข้อมูลการ Booking
  const { step, setStepPayment, resetStepPayment } = useBooking();

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  return (
    <Flex direction="column" w="1440px" bgColor="bg" m="auto" h="100%">
      <Box position="fixed" zIndex="10">
        <Nav_user />
      </Box>
      <Flex h="fit-content" justify="center" pb="106px" mt="100px">
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
            <Flex w="fit-content" gap="24px">
              {step[0] === "current" ? <BasicInfoSummary /> : null}
              {step[1] === "current" ? <SpecialRequest /> : null}
              {step[2] === "current" ? <Payment /> : null}
              <Box overflowX="hidden">
                <PackageSummary />
              </Box>
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
