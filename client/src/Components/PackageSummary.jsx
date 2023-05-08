import { Flex, Text, UnorderedList, ListItem, Box } from "@chakra-ui/react";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { useBooking } from "../contexts/booking";
import changeFormatDate from "../utils/changeFormatDate";
import { useState } from "react";

function PackageSummary() {
  const { bookingData, bookingReq } = useBooking();
  const earlyCheckIn = bookingReq[0];
  const lateCheckOut = bookingReq[1];

  const checkInDate = changeFormatDate(bookingData?.check_in_date);
  const checkOutDate = changeFormatDate(bookingData?.check_out_date);

  const night = bookingData?.night;

  return (
    <Flex direction="column" w="358px" h="568px" gap="16px">
      <Box>
        <Flex
          align="center"
          gap="12px"
          bg="green.800"
          h="62px"
          pl="24px"
          borderTopRadius="4px"
        >
          <HiOutlineBriefcase size="24px" stroke="#81A08F" />
          <Text textStyle="h5" color="white">
            Booking Detail
          </Text>
        </Flex>
        <Flex
          direction="column"
          w="100%"
          gap="40px"
          p="24px"
          bg="green.700"
          color="white"
          borderBottomRadius="4px"
        >
          <Flex justify="space-between" h="56px">
            <Box>
              <Text textStyle="b1" fontWeight="600">
                Check-in
              </Text>
              {earlyCheckIn?.[1] === 0 ? (
                <Text textStyle="b1">After 1:00 PM</Text>
              ) : (
                <Text textStyle="b1">After 2:00 PM</Text>
              )}
            </Box>
            <Box>
              <Text textStyle="b1" fontWeight="600">
                Check-out
              </Text>
              {lateCheckOut?.[1] === 0 ? (
                <Text textStyle="b1">Before 12:00 PM</Text>
              ) : (
                <Text textStyle="b1">Before 11:00 AM</Text>
              )}
            </Box>
          </Flex>
          <Flex direction="column">
            <Text textStyle="b1">
              {checkInDate} - {checkOutDate}
            </Text>
            <Text textStyle="b1">
              {bookingData.amount_guests} Guests ({night} Nights)
            </Text>
          </Flex>
          <Flex w="100%" justify="space-between">
            <Flex w="75%" justify="space-between">
              <Text textStyle="b1" color="green.300">
                {bookingData.room_type_name}
              </Text>
              <Text w="25%" textStyle="b1" color="green.300" textAlign="end">
                x {bookingData.amount_rooms}
              </Text>
            </Flex>
            <Text textStyle="b1" fontWeight="600">
              {bookingData.total_price_per_room.toLocaleString("th-TH", {
                minimumFractionDigits: 2,
              })}
            </Text>
          </Flex>
          {bookingReq?.map((arr, index) => {
            if (
              arr[0] === "additional_request" &&
              arr[1] !== "" &&
              typeof arr[1] === "string"
            ) {
              return (
                <Flex key={index} direction="column" gap="10px">
                  <Text textStyle="b1" fontWeight="600">
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
            } else if (typeof arr[1] === "number") {
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
                  <Text textStyle="b1" fontWeight="600">
                    {typeof arr[1] === "number"
                      ? arr[1].toLocaleString("th-TH", {
                          minimumFractionDigits: 2,
                        })
                      : arr[1]}
                  </Text>
                </Flex>
              );
            }
          })}
          <Flex
            justify="space-between"
            align="baseline"
            borderTop="1px solid"
            borderTopColor="green.600"
            padding="24px 0px 0px"
          >
            <Text textStyle="b1" color="green.300">
              Total
            </Text>
            <Text textStyle="h5" fontWeight="600">
              THB{" "}
              {(bookingReq
                ? night *
                  bookingData.amount_rooms *
                  (bookingData.total_price_per_room +
                    bookingReq?.reduce((sum, arr) => {
                      if (typeof arr[1] === "number") {
                        return sum + arr[1];
                      }
                      return sum;
                    }, 0))
                : night *
                  bookingData.amount_rooms *
                  bookingData.total_price_per_room
              ).toLocaleString("th-TH", {
                minimumFractionDigits: 2,
              })}
            </Text>
          </Flex>
        </Flex>
      </Box>

      <Flex w="358px" h="124px" bg="gray.300" borderRadius="4px">
        <UnorderedList gap="20px" p="16px">
          <ListItem>
            <Text textStyle="b3" color="green.600">
              Cancel booking will get full refund if the cancelation occurs
              before 24 hours of the check-in date.
            </Text>
          </ListItem>
          <ListItem>
            <Text textStyle="b3" color="green.600">
              Able to change check-in or check-out date booking within 24 hours
              of the booking date
            </Text>
          </ListItem>
        </UnorderedList>
      </Flex>
    </Flex>
  );
}

export default PackageSummary;
