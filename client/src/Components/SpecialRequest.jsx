import { Flex, Button, Text, Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useFormik } from "formik";

function SpecialRequest() {
  const formik = useFormik({
    initialValues: {},
    onSubmit: {},
  });
  return (
    <Flex gap="24px">
      <form onSubmit={formik.handleSubmit}>
        <Flex
          direction="column"
          bg="white"
          w="740px"
          p="40px"
          gap="40px"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="4px"
        >
          <Flex direction="column">
            <Text textStyle="h5" color="gray.600">
              Standard Request
            </Text>
            <Text textStyle="b1" color="gray.600">
              These requests are not confirmed (Depend on the available room)
            </Text>
          </Flex>
          <CheckboxGroup colorScheme="orange">
            <Checkbox textStyle="b1" color="gray.700">
              Early check-in
            </Checkbox>
          </CheckboxGroup>
          <Flex w="100%" justify="space-between">
            <Button variant="ghost">Back</Button>
            <Button type="submit" variant="primary">
              Next
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}

export default SpecialRequest;
