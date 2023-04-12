import React from 'react'
import { Box, Flex, Spacer, Button,Text,Image,Input,Avatar,Icon,Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, List, ListItem } from "@chakra-ui/react";
import { Link } from 'react-scroll'
import { Link as RouterLink } from "react-router-dom";

const Nav_user = () => {
  const Menus = ["Profile","Payment Method","Booking History","Log out"]

  return (
    <Flex bg="white" color="black" w="1440px" h="100px" px={150} alignItems="center">
      <RouterLink to="/"><Image src="/HomePage/logo.svg" w="167px" h="45px" mr={10} /></RouterLink>
      <Flex flexGrow={1} alignItems="center">
        <Box ml={8}>
            <Link to='content' smooth={true} duration={1000}><Text textStyle="b2" mr={5} cursor="pointer">About Neatly</Text></Link>
        </Box>
        <Box ml={8}>
            <Link to='service' smooth={true} duration={1000}><Text textStyle="b2" mr={5} cursor="pointer"> Service & Facilities</Text></Link>
        </Box>
        <Box ml={8} >
          <Link to='room-type' smooth={true} duration={1000}><Text textStyle="b2" mr={5} cursor="pointer">Rooms & Suits</Text></Link>
        </Box>
      </Flex>
    
      <Flex w="48px" h="48px" bg="gray.100" justifyContent="center" borderRadius="50%" mr={2} >
        <Image src='/HomePage/icon/icon_bell.svg' w="18px"borderRadius="50%"></Image>
      </Flex>
      <Popover>
      <PopoverTrigger>
        <Avatar size="md" name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
          <PopoverBody>
            <List>
              {Menus.map((menu, index) => (
                <ListItem key={index} py={1}>
                  <Link to={menu.toLowerCase().replace(/\s/g, "-")} smooth={true} duration={1000}>
                    {menu}
                  </Link>
                </ListItem>
              ))}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
   </Flex>
  )
}

export default Nav_user