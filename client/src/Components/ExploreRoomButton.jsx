import { useState } from "react";
import { Flex, Button, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const ExploreRoomButton = (props) => {
  const [roomType, setRoomType] = useState("");
  const handleExploreRoom = (event) => {};
  return (
    <Flex direction="column" pl={props.pl} pb={props.pb} gap="8px">
      <Text textStyle="h3" color="white">
        {props.type}
      </Text>
      <Link to="/roomdetail">
        <Button
          variant="ghost"
          color="white"
          w="fit-content"
          _hover="none"
          _focus={{ color: "white", bg: "none" }}
          rightIcon={<ArrowForwardIcon />}
        >
          Explore Room
        </Button>
      </Link>
    </Flex>
  );
};

export default ExploreRoomButton;
