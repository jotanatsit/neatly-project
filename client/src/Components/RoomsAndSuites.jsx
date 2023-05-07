import { Flex, Text, Grid } from "@chakra-ui/react";
import ExploreRoomButton from "../Components/ExploreRoomButton";

function RoomsAndSuites() {
  return (
    <Flex direction="column" bgColor="bg" w="1440px" id="room-type">
      <Flex justify="center" align="center" h="272px">
        <Text textStyle="h2" color="green.800">
          Rooms & Suites
        </Text>
      </Flex>
      <Grid gap="24px" pb="178px">
        <Flex
          bg="url(./HomePage/superior-garden-view.svg)"
          w="1120px"
          h="540px"
          justifySelf="center"
          align="end"
        >
          <ExploreRoomButton
            type="Superior Garden View"
            pl="60px"
            pb="80px"
            roomTypeId="5"
          />
        </Flex>
        <Flex gap="24px" justifySelf="center">
          <Flex bg="url(./HomePage/deluxe.svg)" w="643px" h="400px" align="end">
            <ExploreRoomButton
              type="Deluxe"
              pl="60px"
              pb="80px"
              roomTypeId="1"
            />
          </Flex>
          <Flex
            bg="url(./HomePage/superior.svg)"
            w="453px"
            h="400px"
            align="end"
          >
            <ExploreRoomButton
              type="Superior"
              pl="60px"
              pb="80px"
              roomTypeId="2"
            />
          </Flex>
        </Flex>
        <Flex gap="24px" justifySelf="center">
          <Flex
            bg="url(./HomePage/premier-sea-view.svg)"
            w="453px"
            h="700px"
            align="end"
          >
            <ExploreRoomButton
              type="Premier Sea View"
              pl="60px"
              pb="80px"
              roomTypeId="6"
            />
          </Flex>
          <Flex direction="column" gap="24px">
            <Flex
              bg="url(./HomePage/supreme.svg)"
              w="643px"
              h="338px"
              align="end"
            >
              <ExploreRoomButton
                type="Supreme"
                pl="80px"
                pb="80px"
                roomTypeId="3"
              />
            </Flex>
            <Flex
              bg="url(./HomePage/suite.svg)"
              w="643px"
              h="338px"
              align="end"
            >
              <ExploreRoomButton
                type="Suite"
                pl="80px"
                pb="80px"
                roomTypeId="4"
              />
            </Flex>
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
}

export default RoomsAndSuites;
