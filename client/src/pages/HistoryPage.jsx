import React from "react";
import Nav_user from "../Components/Nav_user";
import Footer from "../components/Footer";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate();

  const eiei = () => {
    navigate("/cancel");
  };

  return (
    <Flex flexDirection="column" w="1440px" m="auto" bg="bg">
      <Nav_user />
      <Flex flexDirection="column" w="1440px" h="1500px">
        <Text textStyle="h2" color="black" ml="150px" mt="50px">
          Booking History
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
                    Check-in
                  </Text>
                  <Text textStyle="b1">Th, 19 Oct 2022 | After 2:00 PM</Text>
                </Box>
                <Box ml="40px">
                  <Text textStyle="b1" fontWeight="600">
                    Check-in
                  </Text>
                  <Text textStyle="b1">Th, 19 Oct 2022 | After 2:00 PM</Text>
                </Box>
              </Box>
              <Box mt="40px">
                <Accordion allowToggle bg="gray.200" borderRadius="5px">
                  <AccordionItem>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        <Text textStyle="b1" fontWeight="600">
                          Booking Detail
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Box display="flex" justifyContent="space-between">
                        <Text textStyle="b1" fontWeight="400" color="gray.700">
                          2 Guests (1 Night)
                        </Text>
                        <Box display="flex">
                          <Text
                            textStyle="b1"
                            fontWeight="400"
                            color="gray.700"
                          >
                            2 Guests (1 Night) Payment success via
                          </Text>
                          <Text
                            ml={2}
                            textStyle="b1"
                            fontWeight="600"
                            color="gray.700"
                          >
                            Credit Card - *888
                          </Text>
                        </Box>
                      </Box>
                    </AccordionPanel>
                    <AccordionPanel pb={4}>
                      <Box display="flex" justifyContent="space-between">
                        <Text textStyle="b1" fontWeight="400" color="gray.700">
                          Superior Garden View Room
                        </Text>
                        <Text textStyle="b1" fontWeight="600" color="gray.900">
                          2,500.00
                        </Text>
                      </Box>
                    </AccordionPanel>
                    <AccordionPanel pb={4}>
                      <Box display="flex" justifyContent="space-between">
                        <Text textStyle="b1" fontWeight="400" color="gray.700">
                          Airport tranfer
                        </Text>
                        <Text textStyle="b1" fontWeight="600" color="gray.900">
                          200.00
                        </Text>
                      </Box>
                    </AccordionPanel>
                    <AccordionPanel pb={4}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        borderTop="1px solid"
                        color="gray.400"
                        pt={5}
                      >
                        <Text textStyle="b1" fontWeight="400" color="gray.700">
                          Total
                        </Text>
                        <Text textStyle="h5" fontWeight="600" color="gray.900">
                          THB 2,300.00
                        </Text>
                      </Box>
                    </AccordionPanel>
                    <AccordionPanel
                      bg="gray.300"
                      h="88px"
                      borderBottomRadius="5px"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-evenly"
                    >
                      <Text
                        textStyle="b1"
                        fontWeight="600"
                        color="gray.700"
                        mt={2}
                      >
                        Additional Request
                      </Text>
                      <Text
                        textStyle="b1"
                        fontWeight="400"
                        color="gray.700"
                        mt={1}
                      >
                        Can i have some chocolate?
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Flex>
          </Box>
          <Box w="1120px" display="flex" justifyContent="flex-end" mt="20px">
            <Box>
              <Button color="orange.600" border="none" bg="none">
                Room Detail
              </Button>

              <Button variant="primary" onClick={onOpen}>
                Cancel Booking
              </Button>
              <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
              >
                <AlertDialogOverlay />

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <Text color="black"> Cancel Booking</Text>
                  </AlertDialogHeader>
                  <AlertDialogCloseButton />
                  <AlertDialogBody>
                    <Text textStyle="b1">
                      Are you sure you would like to cancel this booking?
                    </Text>
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} variant="secondary" onClick={eiei}>
                      Yes, I want to cancel
                    </Button>
                    <Button variant="primary" onClick={onClose} ml={3}>
                      No, Don’t Cancel
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Box>
          </Box>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default HistoryPage;
