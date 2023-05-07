import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Button, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const ExploreRoomButton = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/roomdetail/${props?.roomTypeId}`);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);
  return (
    <Flex direction="column" pl={props?.pl} pb={props?.pb} gap="8px">
      <Text textStyle="h3" color="white">
        {props?.type}
      </Text>
      <Button
        variant="ghost"
        color="white"
        w="fit-content"
        _hover={{}}
        _focus={{ color: "white", bg: "none" }}
        rightIcon={<ArrowForwardIcon />}
        onClick={handleClick}
      >
        Explore Room
      </Button>
    </Flex>
  );
};

export default ExploreRoomButton;
