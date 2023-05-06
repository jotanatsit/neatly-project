import React from "react";
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
import CustomerBooking from "../Components/CustomerBooking";
import RoomManagement from "../Components/RoomManagement";
import RoomAndProperty from "../Components/RoomAndProperty";
import { useAuth } from "../contexts/authentication";

const AdminPage = () => {
  const { logout } = useAuth();
  return (
    <Flex w="1440px" m="auto">
      <Tabs variant="unstyled">
        <Flex w="1440px" m="auto">
          <Flex w="240px" h="100vh" bg="green.800" flexDirection="column">
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
                    <Box display="flex" w="190px">
                      <Image src="/AdminPage/Vector.svg"></Image>
                      <Text textStyle="b1" color="white" ml={5}>
                        Customer Booking
                      </Text>
                    </Box>
                  </Box>
                </Tab>
                <Tab _selected={{ color: "white", bg: "green.400" }}>
                  <Box
                    h="72px"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-evenly"
                  >
                    <Box display="flex" w="190px">
                      <Image src="/AdminPage/Vector2.svg"></Image>
                      <Text textStyle="b1" color="white" ml={5}>
                        Room Management
                      </Text>
                    </Box>
                  </Box>
                </Tab>
                <Tab _selected={{ color: "white", bg: "green.400" }}>
                  <Box h="72px" display="flex" alignItems="center">
                    <Box display="flex" w="190px">
                      <Image src="/AdminPage/Vector4.svg"></Image>
                      <Text textStyle="b1" color="white" ml={5}>
                        Room & Property
                      </Text>
                    </Box>
                  </Box>
                </Tab>
              </Box>
            </TabList>
            <Box
              h="72px"
              display="flex"
              alignItems="center"
              borderTop="1px solid"
              borderColor="green.700"
            >
              <Box display="flex" w="190px" ml={5}>
                <Button
                  variant="link"
                  onClick={() => {
                    logout();
                  }}
                >
                  <Image src="/AdminPage/Vector7.svg"></Image>
                  <Text textStyle="b1" color="white" ml={5}>
                    Log Out
                  </Text>
                </Button>
              </Box>
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
    </Flex>
  );
};

export default AdminPage;
