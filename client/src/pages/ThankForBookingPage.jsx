import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/react";
import Nav_user from "../Components/Nav_user";
import { useBooking } from "../contexts/booking";
import axios from "axios";
import changeFormatDate from "../utils/changeFormatDate";

function ThankForBooking() {
  const { bookingData, bookingReq } = useBooking();

  const checkInDate = changeFormatDate(bookingData?.check_in_date);
  const checkOutDate = changeFormatDate(bookingData?.check_out_date);

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);
  return (
    <Flex direction="column" w="1440px" bgColor="bg" m="auto" h="100%">
      <Nav_user />
      <Flex h="fit-content" justify="center" pb="106px">
        <Flex
          direction="column"
          align="center"
          w="738px"
          h="fit-content"
          mt="80px"
        >
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
              <br /> We will send you more information about check-in and
              staying at our Neatly
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
                  {checkInDate} - {checkOutDate}
                </Text>
                <Text textStyle="b1" color="white">
                  {bookingData.amount_person} Guests
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
            <Text
              textStyle="b1"
              fontWeight="600"
              color="green.300"
              textAlign="end"
            >
              Payment success via Credit Card - *888
            </Text>
            <Flex w="100%" justify="space-between">
              <Text textStyle="b1" color="green.300" textAlign="start">
                {bookingData.room_type_name}
              </Text>
              <Text
                textStyle="b1"
                fontWeight="600"
                color="white"
                textAlign="end"
              >
                {(
                  bookingData.total_price_per_room * bookingData.amount_room
                ).toLocaleString("th-TH", {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </Flex>
            {bookingReq?.map((arr, index) => {
              if (arr[1] !== null && arr[1] !== "") {
                return (
                  <Flex key={index} w="100%" justify="space-between">
                    <Text textStyle="b1" color="green.300" textAlign="start">
                      {(arr[0]?.charAt(0).toUpperCase() + arr[0]?.slice(1))
                        .split("_")
                        .join(" ")}
                    </Text>
                    <Text
                      textStyle="b1"
                      fontWeight="600"
                      color="white"
                      textAlign="end"
                    >
                      {arr[1].toLocaleString("th-TH", {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                  </Flex>
                );
              }
            })}

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
                THB{" "}
                {(bookingReq
                  ? bookingData.total_price_per_room * bookingData.amount_room +
                    bookingReq?.reduce((sum, arr) => {
                      if (typeof arr[1] === "number") {
                        return sum + arr[1];
                      }
                      return sum;
                    }, 0)
                  : bookingData.total_price_per_room * bookingData.amount_room
                ).toLocaleString("th-TH", {
                  minimumFractionDigits: 2,
                })}
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
      </Flex>
    </Flex>
  );
}
export default ThankForBooking;
