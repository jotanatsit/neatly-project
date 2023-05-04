import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/react";
import Nav_user from "../Components/Nav_user";
import { useAuth } from "../contexts/authentication";
import axios from "axios";
import changeFormatDate from "../utils/changeFormatDate";
import { useBooking } from "../contexts/booking";

function ThankForBooking() {
  const userId = useAuth();
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({});

  const earlyCheckIn = bookingData.booking_request?.[0];
  const lateCheckOut = bookingData.booking_request?.[1];

  const getBookingData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/booking/${userId.UserIdFromLocalStorage}`
      );
      setBookingData(res.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const checkInDate = changeFormatDate(new Date(bookingData?.check_in_date));
  const checkOutDate = changeFormatDate(new Date(bookingData?.check_out_date));

  useEffect(() => {
    window.scrollTo(0, 0);
    getBookingData();
  }, []);

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
                  {bookingData.amount_guests} Guests
                </Text>
              </Flex>
              <Flex gap="24px">
                <Flex direction="column" justify="space-between">
                  <Text textStyle="b1" color="white" fontWeight="600">
                    Check-in
                  </Text>
                  {earlyCheckIn?.[1] === 0 ? (
                    <Text textStyle="b1" color="white">
                      After 1:00 PM
                    </Text>
                  ) : (
                    <Text textStyle="b1" color="white">
                      After 2:00 PM
                    </Text>
                  )}
                </Flex>
                <Flex direction="column" justify="space-between">
                  <Text textStyle="b1" color="white" fontWeight="600">
                    Check-out
                  </Text>
                  {lateCheckOut?.[1] === 0 ? (
                    <Text textStyle="b1" color="white">
                      Before 11:00 AM
                    </Text>
                  ) : (
                    <Text textStyle="b1" color="white">
                      Before 12:00 PM
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Flex>
            <Text
              textStyle="b1"
              fontWeight="600"
              color="green.300"
              textAlign="end"
            >
              Payment success via Credit Card
            </Text>
            <Flex w="100%" justify="space-between">
              <Flex w="75%" justify="space-between">
                <Text textStyle="b1" color="green.300" textAlign="start">
                  {bookingData.room_type_name}
                </Text>
                <Text w="25%" textStyle="b1" color="green.300" textAlign="end">
                  x {bookingData.amount_rooms}
                </Text>
              </Flex>
              <Text
                textStyle="b1"
                fontWeight="600"
                color="white"
                textAlign="end"
              >
                {(
                  bookingData.total_price_per_room * bookingData.amount_rooms
                ).toLocaleString("th-TH", {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </Flex>
            {bookingData.booking_request?.map((arr, index) => {
              if (arr[0] === "additional_request" && arr[1] !== "") {
                return (
                  <Flex key={index} direction="column" gap="10px">
                    <Text textStyle="b1" fontWeight="600" color="white">
                      {arr[0]
                        .split("_")
                        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                        .join(" ")}
                    </Text>
                    <Text textStyle="b1" color="green.300">
                      {arr[1]}
                    </Text>
                  </Flex>
                );
              } else if (arr[1] !== null && arr[1] !== "") {
                return (
                  <Flex key={index} w="100%" justify="space-between">
                    <Flex w="75%" justify="space-between">
                      <Text textStyle="b1" color="green.300">
                        {(arr[0]?.charAt(0).toUpperCase() + arr[0]?.slice(1))
                          .split("_")
                          .join(" ")}
                      </Text>
                      <Text
                        w="25%"
                        textStyle="b1"
                        color="green.300"
                        textAlign="end"
                      >
                        {typeof arr[1] === "number"
                          ? "x " + bookingData.amount_rooms
                          : null}
                      </Text>
                    </Flex>
                    <Text textStyle="b1" fontWeight="600" color="white">
                      {typeof arr[1] === "number"
                        ? (arr[1] * bookingData.amount_rooms).toLocaleString(
                            "th-TH",
                            {
                              minimumFractionDigits: 2,
                            }
                          )
                        : arr[1]}
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
                {(bookingData.booking_request
                  ? bookingData.total_price_per_room *
                      bookingData.amount_rooms +
                    bookingData.booking_request?.reduce((sum, arr) => {
                      if (typeof arr[1] === "number") {
                        return sum + arr[1] * bookingData.amount_rooms;
                      }
                      return sum;
                    }, 0)
                  : bookingData.total_price_per_room * bookingData.amount_rooms
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
