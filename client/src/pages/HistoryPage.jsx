import React from "react";
import Nav_user from "../Components/Nav_user";
import Footer from "../components/Footer";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Menu,
  MenuButton,
  MenuList,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const HistoryPage = () => {
  return (
    <Flex Flex flexDirection="column" w="1440px"  m="auto">
      <Nav_user />
      <Flex flexDirection="column" w="1440px" h="1500px">
        <Text textStyle="h2" color="black" ml="150px" mt="50px">
          Booking History
        </Text>
        <Flex w="1120px" flexDirection="column" mt="50px" ml="150px">
          <Box display="flex" flexDirection="row">
            <Image
              src="/HomePage/room_3.svg"
              w="310px"
              h="210px"
              objectFit="cover"
            />
            <Flex w="769px" flexDirection="column" ml="40px">
              <Box display="flex" justifyContent="space-between">
                <Text textStyle="h4" color="black">
                  Superior Garden View
                </Text>
                <Text>Booking date: Tue, 16 Oct 2022</Text>
              </Box>
              <Box display="flex" mt="20px">
                <Box>
                  <Text>Check-in</Text>
                  <Text>Th, 19 Oct 2022 | After 2:00 PM</Text>
                </Box>
                <Box ml="40px">
                  <Text>Check-in</Text>
                  <Text>Th, 19 Oct 2022 | After 2:00 PM</Text>
                </Box>
              </Box>
              <Box mt="40px">
                <Accordion defaultIndex={[0]} allowMultiple bg="gray.200">
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          Booking Detail
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Box display="flex" justifyContent="space-between">
                        <Text>2 Guests (1 Night)</Text>
                        <Text>
                          2 Guests (1 Night) Payment success via Credit Card -
                          *888
                        </Text>
                      </Box>
                    </AccordionPanel>
                    <AccordionPanel pb={4}>
                      <Box display="flex" justifyContent="space-between">
                        <Text>Superior Garden View Room</Text>
                        <Text>2,500.00</Text>
                      </Box>
                    </AccordionPanel>
                    <AccordionPanel pb={4}>
                      <Box display="flex" justifyContent="space-between">
                        <Text>Airport tranfer</Text>
                        <Text>200.00</Text>
                      </Box>
                    </AccordionPanel>
                    <AccordionPanel pb={4}>
                      <Box display="flex" justifyContent="space-between">
                        <Text>Total</Text>
                        <Text>THB 2,300.00</Text>
                      </Box>
                    </AccordionPanel>
                    <AccordionPanel pb={4} bg="gray.500">
                      <Box display="flex" flexDirection="column">
                        <Text>Additional Request</Text>
                        <Text>Can i have some chocolate?</Text>
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Flex>
          </Box>
          <Box
            w="1120px"
            display="flex"
            justifyContent="space-between"
            mt="20px"
          >
            <Text textStyle="b1" color="orange.500">
              Cancel Booking
            </Text>
            <Box>
              <Button variant="secondary" border="none">
                Room Detail
              </Button>
              <Button variant="primary">Change Date</Button>
            </Box>
          </Box>
        </Flex>
      </Flex>
      <Footer/>
    </Flex>
  );
};

export default HistoryPage;
