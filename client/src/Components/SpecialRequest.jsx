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
      early_check_in: bookingData.early_check_in,
      late_check_out: bookingData.late_check_out,
      non_smoking_room: bookingData.non_smoking_room,
      a_room_on_the_high_floor: bookingData.a_room_on_the_high_floor,
      a_quiet_room: bookingData.a_quiet_room,
      baby_cot: bookingData.baby_cot,
      airport_transfer: bookingData.airport_transfer,
      extra_bed: bookingData.extra_bed,
      extra_pillows: bookingData.extra_pillows,
      phone_chargers_and_adapters: bookingData.phone_chargers_and_adapters,
      breakfast: bookingData.breakfast,
      additional_request: bookingData.additional_request,
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
            {/*  early check in */}
            {formik.values.early_check_in === 0 ? (
              <Checkbox
                defaultChecked
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.early_check_in === null ||
                  formik.values.early_check_in === undefined
                    ? formik.setFieldValue("early_check_in", 0)
                    : formik.setFieldValue("early_check_in", null);
                }}
              >
                Early check-in
              </Checkbox>
            ) : (
              <Checkbox
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.early_check_in === null ||
                  formik.values.early_check_in === undefined
                    ? formik.setFieldValue("early_check_in", 0)
                    : formik.setFieldValue("early_check_in", null);
                }}
              >
                Early check-in
              </Checkbox>
            )}
            {/*  late check out */}
            {formik.values.late_check_out === 0 ? (
              <Checkbox
                defaultChecked
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.late_check_out === null ||
                  formik.values.late_check_out === undefined
                    ? formik.setFieldValue("late_check_out", 0)
                    : formik.setFieldValue("late_check_out", null);
                }}
              >
                Late check-out
              </Checkbox>
            ) : (
              <Checkbox
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.late_check_out === null ||
                  formik.values.late_check_out === undefined
                    ? formik.setFieldValue("late_check_out", 0)
                    : formik.setFieldValue("late_check_out", null);
                }}
              >
                Late check-out
              </Checkbox>
            )}
            {/*  non smoking room */}
            {formik.values.non_smoking_room === 0 ? (
              <Checkbox
                defaultChecked
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.non_smoking_room === null ||
                  formik.values.non_smoking_room === undefined
                    ? formik.setFieldValue("non_smoking_room", 0)
                    : formik.setFieldValue("non_smoking_room", null);
                }}
              >
                Non-smoking room
              </Checkbox>
            ) : (
              <Checkbox
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.non_smoking_room === null ||
                  formik.values.non_smoking_room === undefined
                    ? formik.setFieldValue("non_smoking_room", 0)
                    : formik.setFieldValue("non_smoking_room", null);
                }}
              >
                Non-smoking room
              </Checkbox>
            )}
            {/* a room on high floor */}
            {formik.values.a_room_on_the_high_floor === 0 ? (
              <Checkbox
                defaultChecked
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.a_room_on_the_high_floor === null ||
                  formik.values.a_room_on_the_high_floor === undefined
                    ? formik.setFieldValue("a_room_on_the_high_floor", 0)
                    : formik.setFieldValue("a_room_on_the_high_floor", null);
                }}
              >
                A room on the high floor
              </Checkbox>
            ) : (
              <Checkbox
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.a_room_on_the_high_floor === null ||
                  formik.values.a_room_on_the_high_floor === undefined
                    ? formik.setFieldValue("a_room_on_the_high_floor", 0)
                    : formik.setFieldValue("a_room_on_the_high_floor", null);
                }}
              >
                A room on the high floor
              </Checkbox>
            )}
            {/* a quiet room */}
            {formik.values.a_quiet_room === 0 ? (
              <Checkbox
                defaultChecked
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.a_quiet_room === null ||
                  formik.values.a_quiet_room === undefined
                    ? formik.setFieldValue("a_quiet_room", 0)
                    : formik.setFieldValue("a_quiet_room", null);
                }}
              >
                A quiet room
              </Checkbox>
            ) : (
              <Checkbox
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.a_quiet_room === null ||
                  formik.values.a_quiet_room === undefined
                    ? formik.setFieldValue("a_quiet_room", 0)
                    : formik.setFieldValue("a_quiet_room", null);
                }}
              >
                A quiet room
              </Checkbox>
            )}
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
            {/* baby cot */}
            {formik.values.baby_cot === 400 ? (
              <Checkbox
                defaultChecked
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.baby_cot === null ||
                  formik.values.baby_cot === undefined
                    ? formik.setFieldValue("baby_cot", 400)
                    : formik.setFieldValue("baby_cot", null);
                }}
              >
                Baby cot (+THB 400)
              </Checkbox>
            ) : (
              <Checkbox
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.baby_cot === null ||
                  formik.values.baby_cot === undefined
                    ? formik.setFieldValue("baby_cot", 400)
                    : formik.setFieldValue("baby_cot", null);
                }}
              >
                Baby cot (+THB 400)
              </Checkbox>
            )}
            {/* airport transfer */}
            {formik.values.airport_transfer === 200 ? (
              <Checkbox
                defaultChecked
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.airport_transfer === null ||
                  formik.values.airport_transfer === undefined
                    ? formik.setFieldValue("airport_transfer", 200)
                    : formik.setFieldValue("airport_transfer", null);
                }}
              >
                Airport transfer (+THB 200)
              </Checkbox>
            ) : (
              <Checkbox
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.airport_transfer === null ||
                  formik.values.airport_transfer === undefined
                    ? formik.setFieldValue("airport_transfer", 200)
                    : formik.setFieldValue("airport_transfer", null);
                }}
              >
                Airport transfer (+THB 200)
              </Checkbox>
            )}
            {/* extra bed */}
            {formik.values.extra_bed === 500 ? (
              <Checkbox
                defaultChecked
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.extra_bed === null ||
                  formik.values.extra_bed === undefined
                    ? formik.setFieldValue("extra_bed", 500)
                    : formik.setFieldValue("extra_bed", null);
                }}
              >
                Extra bed (+THB 500)
              </Checkbox>
            ) : (
              <Checkbox
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.extra_bed === null ||
                  formik.values.extra_bed === undefined
                    ? formik.setFieldValue("extra_bed", 500)
                    : formik.setFieldValue("extra_bed", null);
                }}
              >
                Extra bed (+THB 500)
              </Checkbox>
            )}
            {/*extra pillows */}
            {formik.values.extra_pillows === 100 ? (
              <Checkbox
                defaultChecked
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.extra_pillows === null ||
                  formik.values.extra_pillows === undefined
                    ? formik.setFieldValue("extra_pillows", 100)
                    : formik.setFieldValue("extra_pillows", null);
                }}
              >
                Extra pillows (+THB 100)
              </Checkbox>
            ) : (
              <Checkbox
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.extra_pillows === null ||
                  formik.values.extra_pillows === undefined
                    ? formik.setFieldValue("extra_pillows", 100)
                    : formik.setFieldValue("extra_pillows", null);
                }}
              >
                Extra pillows (+THB 100)
              </Checkbox>
            )}
            {/* phone chargers and adapters */}
            {formik.values.phone_chargers_and_adapters === 100 ? (
              <Checkbox
                defaultChecked
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.phone_chargers_and_adapters === null ||
                  formik.values.phone_chargers_and_adapters === undefined
                    ? formik.setFieldValue("phone_chargers_and_adapters", 100)
                    : formik.setFieldValue("phone_chargers_and_adapters", null);
                }}
              >
                Phone chargers and adapters (+THB 100)
              </Checkbox>
            ) : (
              <Checkbox
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.phone_chargers_and_adapters === null ||
                  formik.values.phone_chargers_and_adapters === undefined
                    ? formik.setFieldValue("phone_chargers_and_adapters", 100)
                    : formik.setFieldValue("phone_chargers_and_adapters", null);
                }}
              >
                Phone chargers and adapters (+THB 100)
              </Checkbox>
            )}
            {/* breakfast */}
            {formik.values.breakfast === 150 ? (
              <Checkbox
                defaultChecked
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.breakfast === null ||
                  formik.values.breakfast === undefined
                    ? formik.setFieldValue("breakfast", 150)
                    : formik.setFieldValue("breakfast", null);
                }}
              >
                Breakfast (+THB 150)
              </Checkbox>
            ) : (
              <Checkbox
                textStyle="b1"
                color="gray.700"
                onChange={() => {
                  formik.values.breakfast === null ||
                  formik.values.breakfast === undefined
                    ? formik.setFieldValue("breakfast", 150)
                    : formik.setFieldValue("breakfast", null);
                }}
              >
                Breakfast (+THB 150)
              </Checkbox>
            )}
          </CheckboxGroup>
          <Flex direction="column" gap="4px">
            <Text textStyle="b1" color="gray.900">
              Additional Request
            </Text>
            <Textarea
              border="1px solid"
              borderColor="gray.400"
              value={formik.values.additional_request}
              onChange={(event) => {
                formik.setFieldValue("additional_request", event.target.value);
              }}
            />
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}

export default SpecialRequest;
