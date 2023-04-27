import {
  Flex,
  Button,
  Text,
  Checkbox,
  CheckboxGroup,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useBooking } from "../contexts/booking";

function SpecialRequest() {
  const bookingData = useBooking();
  const formik = useFormik({
    initialValues: {},
    onSubmit: {},
  });

  console.log(formik);

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
          borderBottom="none"
          borderColor="gray.300"
          borderTopRadius="4px"
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
            <Checkbox textStyle="b1" color="gray.700">
              Late check-out
            </Checkbox>
            <Checkbox textStyle="b1" color="gray.700">
              Non-smoking room
            </Checkbox>
            <Checkbox textStyle="b1" color="gray.700">
              A room on the high floor
            </Checkbox>
            <Checkbox textStyle="b1" color="gray.700">
              A quiet room
            </Checkbox>
          </CheckboxGroup>
          <Flex direction="column">
            <Text textStyle="h5" color="gray.600">
              Special Request
            </Text>
            <Text textStyle="b1" color="gray.600">
              Additional charge may apply
            </Text>
          </Flex>
          <CheckboxGroup colorScheme="orange">
            <Checkbox textStyle="b1" color="gray.700">
              Baby cot (+THB 400)
            </Checkbox>
            <Checkbox textStyle="b1" color="gray.700">
              Airport transfer (+THB 200)
            </Checkbox>
            <Checkbox textStyle="b1" color="gray.700">
              Extra pillows (+THB 100)
            </Checkbox>
            <Checkbox textStyle="b1" color="gray.700">
              Phone chargers and adapters (+THB 100)
            </Checkbox>
            <Checkbox textStyle="b1" color="gray.700">
              Breakfast (+THB 150)
            </Checkbox>
          </CheckboxGroup>
          <Flex direction="column" gap="4px">
            <Text textStyle="b1" color="gray.900">
              Additional Request
            </Text>
            <Textarea border="1px solid" borderColor="gray.400"></Textarea>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}

export default SpecialRequest;
