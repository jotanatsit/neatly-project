import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  Image,
  Avatar,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

const Nav_user = () => {
  const { logout } = useAuth();
  return (
    <Flex
      bg="white"
      color="black"
      w="1440px"
      h="100px"
      px={150}
      alignItems="center"
    >
      <RouterLink to="/">
        <Image src="/HomePage/logo.svg" w="167px" h="45px" mr={10} />
      </RouterLink>
      <Flex flexGrow={1} alignItems="center">
        <Box ml={8}>
          <Link to="content" smooth={true} duration={1000}>
            <Text textStyle="b2" mr={5} cursor="pointer">
              About Neatly
            </Text>
          </Link>
        </Box>
        <Box ml={8}>
          <Link to="service" smooth={true} duration={1000}>
            <Text textStyle="b2" mr={5} cursor="pointer">
              {" "}
              Service & Facilities
            </Text>
          </Link>
        </Box>
        <Box ml={8}>
          <Link to="room-type" smooth={true} duration={1000}>
            <Text textStyle="b2" mr={5} cursor="pointer">
              Rooms & Suits
            </Text>
          </Link>
        </Box>
      </Flex>

      <Flex
        w="48px"
        h="48px"
        bg="gray.100"
        justifyContent="center"
        borderRadius="50%"
        mr={2}
      >
        <Image
          src="/HomePage/icon/icon_bell.svg"
          w="18px"
          borderRadius="50%"
        ></Image>
      </Flex>
      <Popover>
        <PopoverTrigger>
          <Avatar
            cursor="pointer"
            size="md"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
        </PopoverTrigger>
        <PopoverContent w="200px" h="172px">
          <PopoverArrow />
          <PopoverBody>
            <Box>
              <List>
                <RouterLink to="">
                  <ListItem>
                    <Flex
                      h="37px"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Box>
                        <Image
                          src="/HomePage/icon/icon_profile.svg"
                          boxSize="20px"
                        ></Image>
                      </Box>
                      <Box w="142px" ml="15px">
                        <Text textStyle="b2" color="gray.700">
                          Profile
                        </Text>
                      </Box>
                    </Flex>
                  </ListItem>
                </RouterLink>
                <RouterLink to="">
                  <ListItem>
                    <Flex
                      h="37px"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Box>
                        <Image
                          src="/HomePage/icon/icon_payment.svg"
                          boxSize="20px"
                        ></Image>
                      </Box>
                      <Box w="142px" ml="15px">
                        <Text textStyle="b2" color="gray.700">
                          Payment Method
                        </Text>
                      </Box>
                    </Flex>
                  </ListItem>
                </RouterLink>
                <RouterLink to="">
                  <ListItem>
                    <Flex
                      h="37px"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Box>
                        <Image
                          src="/HomePage/icon/icon_menu.svg"
                          boxSize="20px"
                        ></Image>
                      </Box>
                      <Box w="142px" ml="15px">
                        <Text textStyle="b2" color="gray.700">
                          Booking History
                        </Text>
                      </Box>
                    </Flex>
                  </ListItem>
                </RouterLink>
                <RouterLink to="">
                  <ListItem>
                    <Flex
                      h="37px"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Box>
                        <Image
                          src="/HomePage/icon/icon_logout.svg"
                          boxSize="20px"
                        ></Image>
                      </Box>
                      <Box w="142px" ml="15px">
                        <Button
                          variant="link"
                          onClick={() => {
                            logout();
                          }}
                        >
                          <Text textStyle="b2" color="gray.700">
                            Log out
                          </Text>
                        </Button>
                      </Box>
                    </Flex>
                  </ListItem>
                </RouterLink>
              </List>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default Nav_user;
