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
import { useEffect } from "react";

function SpecialRequest() {
  const { bookingData, addBookingData, setBookingRequests } = useBooking();

  const formik = useFormik({
    initialValues: {
      early_check_in: null,
      late_check_out: null,
      non_smoking_room: null,
      a_room_on_the_high_floor: null,
      a_quiet_room: null,
      baby_cot: null,
      airport_transfer: null,
      extra_bed: null,
      extra_pillows: null,
      phone_chargers_and_adapters: null,
      breakfast: null,
      additional_request: "",
    },
  });

  const bookingRequests = Object.entries(formik.values).map(([key, value]) => [
    key,
    value,
  ]);

  useEffect(() => {
    addBookingData({
      ...bookingData,
      ...formik.values,
    });
  }, [formik.values]);

  useEffect(() => {
    setBookingRequests(bookingRequests);
  }, [formik.values]);

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
            <Checkbox
              textStyle="b1"
              color="gray.700"
              onChange={() => {
                formik.values.early_check_in === null
                  ? formik.setFieldValue("early_check_in", 0)
                  : formik.setFieldValue("early_check_in", null);
              }}
            >
              Early check-in
            </Checkbox>
            <Checkbox
              textStyle="b1"
              color="gray.700"
              onChange={() => {
                formik.values.late_check_out === null
                  ? formik.setFieldValue("late_check_out", 0)
                  : formik.setFieldValue("late_check_out", null);
              }}
            >
              Late check-out
            </Checkbox>
            <Checkbox
              textStyle="b1"
              color="gray.700"
              onChange={() => {
                formik.values.non_smoking_room === null
                  ? formik.setFieldValue("non_smoking_room", 0)
                  : formik.setFieldValue("non_smoking_room", null);
              }}
            >
              Non-smoking room
            </Checkbox>
            <Checkbox
              textStyle="b1"
              color="gray.700"
              onChange={() => {
                formik.values.a_room_on_the_high_floor === null
                  ? formik.setFieldValue("a_room_on_the_high_floor", 0)
                  : formik.setFieldValue("a_room_on_the_high_floor", null);
              }}
            >
              A room on the high floor
            </Checkbox>
            <Checkbox
              textStyle="b1"
              color="gray.700"
              onChange={() => {
                formik.values.a_quiet_room === null
                  ? formik.setFieldValue("a_quiet_room", 0)
                  : formik.setFieldValue("a_quiet_room", null);
              }}
            >
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
            <Checkbox
              textStyle="b1"
              color="gray.700"
              onChange={() => {
                formik.values.baby_cot === null
                  ? formik.setFieldValue("baby_cot", 400)
                  : formik.setFieldValue("baby_cot", null);
              }}
            >
              Baby cot (+THB 400)
            </Checkbox>
            <Checkbox
              textStyle="b1"
              color="gray.700"
              onChange={() => {
                formik.values.airport_transfer === null
                  ? formik.setFieldValue("airport_transfer", 200)
                  : formik.setFieldValue("airport_transfer", null);
              }}
            >
              Airport transfer (+THB 200)
            </Checkbox>
            <Checkbox
              textStyle="b1"
              color="gray.700"
              onChange={() => {
                formik.values.extra_bed === null
                  ? formik.setFieldValue("extra_bed", 500)
                  : formik.setFieldValue("extra_bed", null);
              }}
            >
              Extra bed (+THB 500)
            </Checkbox>
            <Checkbox
              textStyle="b1"
              color="gray.700"
              onChange={() => {
                formik.values.extra_pillows === null
                  ? formik.setFieldValue("extra_pillows", 100)
                  : formik.setFieldValue("extra_pillows", null);
              }}
            >
              Extra pillows (+THB 100)
            </Checkbox>
            <Checkbox
              textStyle="b1"
              color="gray.700"
              onChange={() => {
                formik.values.phone_chargers_and_adapters === null
                  ? formik.setFieldValue("phone_chargers_and_adapters", 100)
                  : formik.setFieldValue("phone_chargers_and_adapters", null);
              }}
            >
              Phone chargers and adapters (+THB 100)
            </Checkbox>
            <Checkbox
              textStyle="b1"
              color="gray.700"
              onChange={() => {
                formik.values.breakfast === null
                  ? formik.setFieldValue("breakfast", 150)
                  : formik.setFieldValue("breakfast", null);
              }}
            >
              Breakfast (+THB 150)
            </Checkbox>
          </CheckboxGroup>
          <Flex direction="column" gap="4px">
            <Text textStyle="b1" color="gray.900">
              Additional Request
            </Text>
            <Textarea
              border="1px solid"
              borderColor="gray.400"
              onChange={(event) => {
                formik.setFieldValue("additional_request", event.target.value);
              }}
            ></Textarea>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}

export default SpecialRequest;
