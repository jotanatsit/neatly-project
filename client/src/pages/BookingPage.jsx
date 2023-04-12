import React from 'react'
import { Button, Flex, Text,Image,Box} from '@chakra-ui/react'
import Nav_nonuser from '../Components/Nav_nonuser'
import Booking_box from '../Components/Booking_box'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const BookingPage = () => {
  return (
    <Flex flexDirection="column" w="1440px">
        <Nav_nonuser/>
        <Box  w="1440px"   borderRadius="4px" alignItems="center" >
            <Booking_box />
        </Box>
        <Flex w="1440px" height="1895px" flexDirection="column" alignItems="center" bg="#EDECEC">
            <Flex width={1120} borderBottom="1px solid gray" height={400} mt={20} flexDirection="row" alignItems="center" justifyContent="space-between">
                <Image src='/BookingPage/booking_room1.svg' w={453} h={320}></Image>
                <Flex w={619} h={320}  flexDirection="column" alignItems="end" >
                    <Flex w={602} h={186}  flexDirection="row" justifyContent="space-between" mt="5" >
                        <Flex flexDirection="column" w={314} h={178}  justifyContent="space-between">
                            <Flex flexDirection="column">
                                <Text textStyle="h4" color="black" >Superior Garden View</Text>
                                <Flex flexDirection="row" mt="10px" >
                                    <Text fontSize="16px" borderRight="1px solid" paddingRight="5px">2 Guests</Text>
                                    <Text fontSize="16px" borderRight="1px solid" paddingRight="5px">1 Double bed</Text>
                                    <Text fontSize="16px" borderRight="1px solid" paddingRight="5px">32 sqm</Text>
                                </Flex>
                            </Flex>
                            <Flex>
                                <Text>Rooms (36sqm) with full garden views, 1 single bed, bathroom with bathtub & shower.</Text>
                            </Flex>
                        </Flex>

                        <Flex w="260px" h="186px" flexDirection="column">
                            <Flex flexDirection="column" w="260px" h="58px"textAlign="end">
                                <Text as='del'>THB 3,100.00</Text>
                                <Text textStyle="h5" color="black">THB 2,500.00</Text>
                            </Flex>
                            <Flex flexDirection="column" w="260px" h="58px" textAlign="end" mt="5">
                                <Text>Per Night</Text>
                                <Text>(Including Taxes & Fees)</Text>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex mt="10">
                        <Link to="/roomdetail"><Button bg="none" color="orange.600" p="16px 32px">Room Detail</Button></Link>
                        <Button variant="primary" p="16px 32px">Book Now</Button>
                    </Flex>
                </Flex>
            </Flex>       

            <Flex width={1120} height={400} borderBottom="1px solid gray" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Image src='/BookingPage/booking_room2.svg' w={453} h={320}></Image>
                <Flex w={619} h={320}  flexDirection="column" alignItems="end" >
                    <Flex w={602} h={186}  flexDirection="row" justifyContent="space-between" mt="5" >
                        <Flex flexDirection="column" w={314} h={178}  justifyContent="space-between">
                            <Flex flexDirection="column">
                                <Text textStyle="h4" color="black" >Deluxe</Text>
                                <Flex flexDirection="row" mt="10px">
                                    <Text fontSize="16px" borderRight="1px solid" paddingRight="5px">2 Guests</Text>
                                    <Text fontSize="16px" borderRight="1px solid" paddingRight="5px">1 Double bed</Text>
                                    <Text fontSize="16px" borderRight="1px solid" paddingRight="5px">32 sqm</Text>
                                </Flex>
                            </Flex>
                            <Flex>
                                <Text>Rooms (36sqm) with full garden views, 1 single bed, bathroom with bathtub & shower.</Text>
                            </Flex>
                        </Flex>

                        <Flex w="260px" h="186px" flexDirection="column">
                            <Flex flexDirection="column" w="260px" h="58px"textAlign="end">
                                <Text as='del'>THB 3,100.00</Text>
                                <Text textStyle="h5" color="black">THB 2,500.00</Text>
                            </Flex>
                            <Flex flexDirection="column" w="260px" h="58px" textAlign="end" mt="5">
                                <Text>Per Night</Text>
                                <Text>(Including Taxes & Fees)</Text>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex mt="10">
                        <Link to="/roomdetail"><Button bg="none" color="orange.600" p="16px 32px">Room Detail</Button></Link>
                        <Button variant="primary" p="16px 32px">Book Now</Button>
                    </Flex>
                </Flex>
            </Flex>

            <Flex width={1120} height={400} borderBottom="1px solid gray" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Image src='/BookingPage/booking_room3.svg' w={453} h={320}></Image>
                <Flex w={619} h={320}  flexDirection="column" alignItems="end" >
                    <Flex w={602} h={186}  flexDirection="row" justifyContent="space-between" mt="5" >
                        <Flex flexDirection="column" w={314} h={178}  justifyContent="space-between">
                            <Flex flexDirection="column">
                                <Text textStyle="h4" color="black" >Superior</Text>
                                <Flex flexDirection="row" mt="10px">
                                    <Text fontSize="16px" borderRight="1px solid" paddingRight="5px">2 Guests</Text>
                                    <Text fontSize="16px" borderRight="1px solid" paddingRight="5px">1 Double bed</Text>
                                    <Text fontSize="16px" borderRight="1px solid" paddingRight="5px">32 sqm</Text>
                                </Flex>
                            </Flex>
                            <Flex>
                                <Text>Rooms (36sqm) with full garden views, 1 single bed, bathroom with bathtub & shower.</Text>
                            </Flex>
                        </Flex>

                        <Flex w="260px" h="186px" flexDirection="column">
                            <Flex flexDirection="column" w="260px" h="58px"textAlign="end">
                                <Text as='del'>THB 3,100.00</Text>
                                <Text textStyle="h5" color="black">THB 2,500.00</Text>
                            </Flex>
                            <Flex flexDirection="column" w="260px" h="58px" textAlign="end" mt="5">
                                <Text>Per Night</Text>
                                <Text>(Including Taxes & Fees)</Text>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex mt="10">
                        <Link to="/roomdetail"><Button bg="none" color="orange.600" p="16px 32px">Room Detail</Button></Link>
                        <Button variant="primary" p="16px 32px">Book Now</Button>
                    </Flex>
                </Flex>
            </Flex>

            <Flex width={1120} height={400} borderBottom="1px solid gray" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Image src='/BookingPage/booking_room4.svg' w={453} h={320}></Image>
                <Flex w={619} h={320}  flexDirection="column" alignItems="end" >
                    <Flex w={602} h={186}  flexDirection="row" justifyContent="space-between" mt="5" >
                        <Flex flexDirection="column" w={314} h={178}  justifyContent="space-between">
                            <Flex flexDirection="column">
                                <Text textStyle="h4" color="black" >Supreme</Text>
                                <Flex flexDirection="row" mt="10px">
                                    <Text fontSize="16px" borderRight="1px solid" paddingRight="5px">2 Guests</Text>
                                    <Text fontSize="16px" borderRight="1px solid" paddingRight="5px">1 Double bed</Text>
                                    <Text fontSize="16px" borderRight="1px solid" paddingRight="5px">32 sqm</Text>
                                </Flex>
                            </Flex>
                            <Flex>
                                <Text>Rooms (36sqm) with full garden views, 1 single bed, bathroom with bathtub & shower.</Text>
                            </Flex>
                        </Flex>

                        <Flex w="260px" h="186px" flexDirection="column">
                            <Flex flexDirection="column" w="260px" h="58px"textAlign="end">
                                <Text as='del'>THB 3,100.00</Text>
                                <Text textStyle="h5" color="black">THB 2,500.00</Text>
                            </Flex>
                            <Flex flexDirection="column" w="260px" h="58px" textAlign="end" mt="5">
                                <Text>Per Night</Text>
                                <Text>(Including Taxes & Fees)</Text>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex mt="10">
                        <Link to="/roomdetail"><Button bg="none" color="orange.600" p="16px 32px">Room Detail</Button></Link>
                        <Button variant="primary" p="16px 32px">Book Now</Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
        <Footer />
    </Flex>
  )
}

export default BookingPage