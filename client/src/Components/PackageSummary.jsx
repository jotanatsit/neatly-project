import { Flex, Text, UnorderedList, ListItem, Box } from "@chakra-ui/react";
import { HiOutlineBriefcase } from "react-icons/hi2";

function Note() {
  return (
    <Flex w="358px" h="124px" bg="gray.300" borderRadius="4px">
      <UnorderedList gap="20px" p="16px">
        <ListItem>
          <Text textStyle="b3" color="green.600">
            Cancel booking will get full refund if the cancelation occurs before
            24 hours of the check-in date.
          </Text>
        </ListItem>
        <ListItem>
          <Text textStyle="b3" color="green.600">
            Able to change check-in or check-out date booking within 24 hours of
            the booking date
          </Text>
        </ListItem>
      </UnorderedList>
    </Flex>
  );
}
function PackageSummary() {
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
              <Text textStyle="b1">After 2:00 PM</Text>
            </Box>
            <Box>
              <Text textStyle="b1" fontWeight="600">
                Check-out
              </Text>
              <Text textStyle="b1">Before 12:00 PM</Text>
            </Box>
          </Flex>
          <Flex direction="column">
            <Text>Th, 19 Oct 2022 - Fri, 20 Oct 2022</Text>
            <Text>2 Guests</Text>
          </Flex>
          <Flex justify="space-between">
            <Text>Superior Garden View Room</Text>
            <Text>2,500.00</Text>
          </Flex>
          <Flex justify="space-between">
            <Text>Total</Text>
            <Text>THB 2,500.00</Text>
          </Flex>
        </Flex>
      </Box>
      <Note />
    </Flex>
  );
}
export default PackageSummary;
