import { Flex, Text, Square } from "@chakra-ui/react";

function StepPayment(props) {
  if (props.status === "current") {
    return (
      <Flex h="66px" w="245px" align="center" justify="space-between">
        <Square textStyle="h4" size="66px" color="white" bg="orange.500">
          {props.step}
        </Square>
        <Text textStyle="h5" color="orange.500">
          {props.title}
        </Text>
      </Flex>
    );
  } else if (props.status === "finish") {
    return (
      <Flex h="66px" w="245px" align="center" justify="space-between">
        <Square textStyle="h4" size="66px" color="orange.500" bg="orange.100">
          {props.step}
        </Square>
        <Text textStyle="h5" color="orange.500">
          {props.title}
        </Text>
      </Flex>
    );
  } else if (props.status === "none") {
    return (
      <Flex h="66px" w="245px" align="center" justify="space-between">
        <Square textStyle="h4" size="66px" color="gray.600" bg="gray.200">
          {props.step}
        </Square>
        <Text textStyle="h5" color="gray.600">
          {props.title}
        </Text>
      </Flex>
    );
  }
}

export default StepPayment;
