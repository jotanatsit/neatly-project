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
  Box,
  FormHelperText,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { useAuth } from "../contexts/authentication";
import { Link, Outlet } from "react-router-dom";
import Nav_nonuser from "../Components/Nav_nonuser.jsx";
import { useFormik } from "formik";

function LoginPage() {
  const { login, state } = useAuth();

  const onSubmit = (values, actions) => {
    login({ username: values.email, password: values.password });
    actions.setSubmitting(false);
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit,
  });

  let isEmailError = false;
  let isPasswordError = false;

  if (state.error === "user not found") {
    isEmailError = true;
  }

  if (state.error === "password not valid") {
    isPasswordError = true;
  }

  return (
    <Box w="1440px" m="auto">
      <Box position="fixed" zIndex="10">
        <Nav_nonuser />
      </Box>
      <Grid templateColumns="repeat(2, 1fr)">
        <Box mt="100px">
          <img src="/LoginPage/sidepic.svg"></img>
        </Box>
        <Flex
          height="924px"
          flexDirection="column"
          align="center"
          pt="150px"
          mt="100px"
        >
          <Flex width="452px" justifyContent="flex-start">
            <Text textStyle="h1" color="green.800">
              Log In
            </Text>
          </Flex>
          <form onSubmit={handleSubmit}>
            <Flex flexDirection="column" height="320px" width="452px" mt="60px">
              <FormControl isInvalid={isEmailError}>
                <FormLabel htmlFor="email">
                  <Text textStyle="b1" color="gray.900">
                    Username or Email
                  </Text>
                </FormLabel>
                <Input
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="email"
                  type="text"
                  placeholder="Enter your username or email"
                />
                {!isEmailError ? (
                  <FormHelperText></FormHelperText>
                ) : (
                  <FormErrorMessage>
                    <Text color="red">User not found</Text>
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={isPasswordError}>
                <FormLabel htmlFor="password">
                  <Text textStyle="b1" color="gray.900">
                    Password
                  </Text>
                </FormLabel>
                <Input
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
                {!isPasswordError ? (
                  <FormHelperText></FormHelperText>
                ) : (
                  <FormErrorMessage>
                    <Text color="red">
                      The password that you've entered is incorrect.
                    </Text>
                  </FormErrorMessage>
                )}
              </FormControl>
              <Button
                variant="primary"
                height="48px"
                width="452px"
                type="submit"
                mt="40px"
              >
                Log In
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
          </form>
        </Flex>
      </Grid>
    </Box>
  );
}

export default LoginPage;
