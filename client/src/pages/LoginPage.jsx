import {
  Flex,
  Button,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  extendTheme,
  Grid,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { useAuth } from "../contexts/authentication";
import { Link } from "react-router-dom";
import Nav_nonuser from "../Components/Nav_nonuser.jsx";

function LoginPage() {
  const { login } = useAuth();

  function validateUserName(value) {
    let errorMessage;
    if (!value) {
      errorMessage = "Username or Email is required";
    }
    return errorMessage;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = "Password is required";
    }
    return error;
  }

  return (
    <div>
      <Nav_nonuser />
      <Grid templateColumns="repeat(2, 1fr)">
        <img src="/LoginPage/sidepic.svg"></img>
        <Flex height="924px" flexDirection="column" align="center" pt="150px">
          <Flex width="452px" justifyContent="flex-start">
            <Text textStyle="h1" color="green.800">
              Log In
            </Text>
          </Flex>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, actions) => {
              login({ username: values.email, password: values.password });
              actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Form>
                <Flex flexDirection="column" height="120px" mt="60px">
                  <Field
                    name="email"
                    height="48px"
                    width="452px"
                    validate={validateUserName}
                  >
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel>
                          <Text textStyle="b1" color="gray.900">
                            Username or Email
                          </Text>
                        </FormLabel>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter your username or email"
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name="password"
                    height="48px"
                    width="452px"
                    validate={validatePassword}
                  >
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel mt="40px">
                          <Text textStyle="b1" color="gray.900">
                            Password
                          </Text>
                        </FormLabel>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    variant="primary"
                    height="48px"
                    width="452px"
                    type="submit"
                    mt="40px"
                  >
                    Submit
                  </Button>
                  <Flex width="452px" justifyContent="flex-start" mt="16px">
                    <Text>Don't have an account yet?</Text>
                    <Link to="/register" ml="8px">
                      <Text ml="8px" color="orange.500">
                        Register
                      </Text>
                    </Link>
                  </Flex>
                </Flex>
              </Form>
            )}
          </Formik>
        </Flex>
      </Grid>
    </div>
  );
}

export default LoginPage;
