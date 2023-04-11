import { Flex, Button, Text, Grid, Box } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

function Room(props) {
   return (
      <Box pl={props.pl} pb={props.pb}>
         <Text textStyle="h3" color="white" textAlign="center">{props.type}</Text>
         <Button variant="ghost" color="white" w="fit-content" _hover="none" _focus={{ color: "white" }} rightIcon={<ArrowForwardIcon />} >Explore Room</Button>
      </Box>
   )
}

function RoomsAndSuits() {
   return (
      <Flex direction="column" bgColor="bg" w="1440px">
         <Flex justify="center" align="center" h="272px">
            <Text textStyle="h2" color="green.800" >Rooms & Suits</Text>
         </Flex>
         <Grid gap="24px" pb="178px">
            <Flex bg="url(./HomePage/superior-garden-view.svg)" w="1120px" h="540px" justifySelf="center" align="end">
               <Room type="Superior Garden View" pl="60px" pb="80px" />
            </Flex>
            <Flex gap="24px" justifySelf="center">
               <Flex bg="url(./HomePage/deluxe.svg)" w="643px" h="400px" align="end">
                  <Room type="Deluxe" pl="60px" pb="80px" />
               </Flex>
               <Flex bg="url(./HomePage/superior.svg)" w="453px" h="400px" align="end">
                  <Room type="Superior" pl="60px" pb="80px" />
               </Flex>
            </Flex>
            <Flex gap="24px" justifySelf="center">
               <Flex bg="url(./HomePage/premier-sea-view.svg)" w="453px" h="700px" align="end">
                  <Room type="Premier Sea View" pl="60px" pb="80px" />
               </Flex>
               <Flex direction="column" gap="24px">
                  <Flex bg="url(./HomePage/supreme.svg)" w="643px" h="338px" align="end">
                     <Room type="Superior" pl="80px" pb="80px" />
                  </Flex>
                  <Flex bg="url(./HomePage/suite.svg)" w="643px" h="338px" align="end">
                     <Room type="Superior" pl="80px" pb="80px" />
                  </Flex>
               </Flex>
            </Flex>
         </Grid>
      </Flex>
   )
}

export default RoomsAndSuits