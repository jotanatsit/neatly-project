import { useState, useEffect } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import Nav_user from "../Components/Nav_user";
import StepPayment from "../Components/StepPayment";
import BasicInfoSummary from "../Components/BasicInfoSummary.jsx";
import SpecialRequest from "../Components/SpecialRequest";
import PaymentMethod from "../Components/PaymentMethod";
import ThankForBooking from "../Components/ThankForBooking";
import PackageSummary from "../Components/PackageSummary.jsx";
import Payment from "../Components/Payment";
import { useBooking } from "../contexts/booking";

function BookingSummary() {
  const [status, setStatus] = useState(["current", "none", "none"]);
  const [confirm, setConfirm] = useState(false);

  // useBooking() เป็น context ที่เกี่ยวกับการเก็บข้อมูลการ Booking
  const { resetBookingData } = useBooking();
  useEffect(() => resetBookingData(), []);

  function nextStatus() {
    if (status[0] === "current") {
      setStatus(["finish", "current", "none"]);
    } else if (status[1] === "current") {
      setStatus(["finish", "finish", "current"]);
    }
  }

  function backStatus() {
    if (status[2] === "current") {
      setStatus(["finish", "current", "none"]);
    } else if (status[1] === "current") {
      setStatus(["current", "none", "none"]);
    }
  }

  function confirmBooking() {
    setConfirm(true);
  }

  return (
    <Flex direction="column" w="1440px" bgColor="bg" m="auto">
      <Nav_user />

      <Flex h="fit-content" justify="center" pb="106px">
        {confirm ? (
          <ThankForBooking />
        ) : (
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
              <StepPayment
                status={status[0]}
                step={1}
                title="Basic Information"
              />
              <StepPayment
                status={status[1]}
                step={2}
                title="Special Request"
              />
              <StepPayment status={status[2]} step={3} title="Payment Method" />
            </Flex>
            <Flex direction="column" mt="40px">
              <Flex gap="24px">
                {status[0] === "current" ? <BasicInfoSummary /> : null}
                {status[1] === "current" ? <SpecialRequest /> : null}
                {status[2] === "current" ? <Payment /> : null}
                <PackageSummary />
              </Flex>

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
                {status[0] === "current" ? (
                  <Button variant="ghost" isDisabled>
                    Back
                  </Button>
                ) : (
                  <Button variant="ghost" onClick={backStatus}>
                    Back
                  </Button>
                )}
                {status[2] === "current" ? (
                  <Button variant="primary" onClick={confirmBooking}>
                    Confirm Booking
                  </Button>
                ) : (
                  <Button variant="primary" onClick={nextStatus}>
                    Next
                  </Button>
                )}
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default BookingSummary;
