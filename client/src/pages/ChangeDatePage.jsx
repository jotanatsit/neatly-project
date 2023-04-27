import React, { useState } from "react";
import Nav_user from "../Components/Nav_user";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Menu,
  MenuButton,
  MenuList,
  Icon,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const ChangeDatePage = () => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  return (
    <Flex flexDirection="column" w="1440px" m="auto" bg="bg">
      <Nav_user />
      <Flex flexDirection="column" w="1440px" h="1500px">
        <Text textStyle="h2" color="black" ml="150px" mt="50px">
          Change Check-in <br /> and Check-out Date
        </Text>
        <Flex
          w="1120px"
          flexDirection="column"
          mt="50px"
          ml="150px"
          borderBottom="2px solid"
          borderColor="gray.300"
          pb={10}
        >
          <Box display="flex" flexDirection="row">
            <Image
              src="/HomePage/room_3.svg"
              w="310px"
              h="210px"
              objectFit="cover"
              borderRadius={9}
            />
            <Flex w="769px" flexDirection="column" ml="40px">
              <Box display="flex" justifyContent="space-between">
                <Text textStyle="h4" color="black">
                  Superior Garden View
                </Text>
                <Text textStyle="b1" color="gray.600">
                  Booking date: Tue, 16 Oct 2022
                </Text>
              </Box>
              <Box display="flex" mt="20px">
                <Box>
                  <Text textStyle="b1" fontWeight="600">
                    Original Date
                  </Text>
                  <Text textStyle="b1">Th, 19 Oct 2022 - Fri, 20 Oct 2022</Text>
                </Box>
              </Box>
              <Box
                mt="40px"
                w="715px"
                h="125px"
                bg="white"
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
              >
                <Text textStyle="b1" fontWeight="600" ml={4}>
                  Change Date
                </Text>
                <Box display="flex" ml={4} alignItems="center">
                  <Menu>
                    <Flex flexDirection="column">
                      <Text textStyle="b1">
                        <label>Check In</label>
                      </Text>
                      <MenuButton
                        as={Button}
                        iconSpacing="10"
                        cursor="pointer"
                        _hover={{ bg: "none" }}
                        _focus={{ bg: "none" }}
                        color="gray.600"
                        bg="white"
                        border="1px solid"
                        borderColor="gray.400"
                        style={{ width: "250px" }}
                      >
                        <Box
                          w="210px"
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text textStyle="b1">
                            {format(date[0].startDate, "MM/dd/yyyy")}
                          </Text>
                          <CalendarIcon />
                        </Box>
                      </MenuButton>
                    </Flex>
                    <Text mx={5}>-</Text>
                    <Flex flexDirection="column">
                      <Text textStyle="b1">
                        <label>Check Out</label>
                      </Text>
                      <MenuButton
                        as={Button}
                        iconSpacing="10"
                        cursor="pointer"
                        _hover={{ bg: "none" }}
                        _focus={{ bg: "none" }}
                        color="gray.600"
                        bg="white"
                        border="1px solid"
                        borderColor="gray.400"
                        style={{ width: "250px" }}
                      >
                        <Box
                          w="210px"
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text textStyle="b1">
                            {format(date[0].endDate, "MM/dd/yyyy")}
                          </Text>
                          <CalendarIcon />
                        </Box>
                      </MenuButton>
                    </Flex>
                    <MenuList position="absolute" right="-240px">
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        style={{ width: "500px" }}
                      />
                    </MenuList>
                  </Menu>
                </Box>
              </Box>
            </Flex>
          </Box>
          <Box
            w="1120px"
            display="flex"
            justifyContent="space-between"
            mt="20px"
          >
            <Button variant="ghost" color="orange.600">
              Cancel Booking
            </Button>
            <Box>
              <Button variant="primary" p="25px 25px">
                Change Date
              </Button>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChangeDatePage;
