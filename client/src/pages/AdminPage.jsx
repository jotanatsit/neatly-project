import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { BrowserRouter, Route } from "react-router-dom";
import CustomerBooking from "../Components/CustomerBooking";
import CustomerBookingDetail from "../Components/CustomerBookingDetail";
import RoomManagement from "../Components/RoomManagement";
import RoomAndProperty from "../Components/RoomAndProperty";
import axios from "axios";

const AdminPage = () => {
  return (
    <Tabs variant="unstyled">
      <Flex w="1440px" m="auto">
        <Flex w="240px" h="1024px" bg="green.800" flexDirection="column">
          <Box
            w="240px"
            h="152px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image src="/HomePage/logo2.svg" mb={4}></Image>
            <Text textStyle="b1" color="green.400">
              Admin Panel Control
            </Text>
          </Box>
          <TabList>
            <Box w="240px" h="540px" display="flex" flexDirection="column">
              <Tab _selected={{ color: "white", bg: "green.500" }}>
                <Box h="72px" display="flex" alignItems="center">
                  <Image src="/AdminPage/Vector.svg"></Image>
                  <Text textStyle="b1" color="white">
                    Customer Booking
                  </Text>
                </Box>
              </Tab>
              <Tab _selected={{ color: "white", bg: "green.400" }}>
                <Box h="72px" display="flex" alignItems="center" justifyContent="space-evenly">
                  <Image src="/AdminPage/Vector2.svg"></Image>
                  <Text textStyle="b1" color="white">
                    Room Management
                  </Text>
                </Box>
              </Tab>
              <Tab _selected={{ color: "white", bg: "green.400" }}>
                <Box h="72px" display="flex" alignItems="center">
                <Image src="/AdminPage/Vector4.svg"></Image>
                  <Text textStyle="b1" color="white">
                    Room & Property
                  </Text>
                </Box>
              </Tab>
            </Box>
          </TabList>
          <Box display="flex" >
            <Image src="/AdminPage/Vector7.svg"></Image>
            <Text color="white">logout</Text>
          </Box>
        </Flex>
        <Flex>
          <TabPanels>
            <TabPanel p={0}>
              <CustomerBooking />
            </TabPanel>
            <TabPanel p={0}>
              <RoomManagement />
            </TabPanel>
            <TabPanel p={0}>
              <RoomAndProperty />
            </TabPanel>
          </TabPanels>
        </Flex>
      </Flex>
    </Tabs>
  );
};

export default AdminPage;
