import {
  Flex,
  Button,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  extendTheme,
} from "@chakra-ui/react";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
// import { useAuth } from "../contexts/authentication";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //   const { login } = useAuth()

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     // 🐨 Todo: Exercise #4
  //     //  นำ Function `login` ใน AuthContext มา Execute ใน Event Handler ตรงนี้
  //     login({
  //       username,
  //       password,
  //     })
  //   };
  function validateUserName(value) {
    let errorMessage;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      errorMessage = "Invalid email address";
    }
    return errorMessage;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = "Password is required";
    }
    // else if (value.toLowerCase() !== "naruto") {
    //   error = "Jeez! You're not a fan 😱";
    // }
    return error;
  }

  return (
    <Flex
      height="924px"
      // width="732px"
      flexDirection="column"
      align="center"
    >
      <Flex width="452px" justifyContent="flex-start">
        <Text textStyle="h1" color="green.800">
          Log In
        </Text>
      </Flex>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
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
                      <Text textStyle="b1" color="gray.800">
                        Username or Email
                      </Text>
                    </FormLabel>
                    <Input
                      {...field}
                      type="email"
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
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel mt="40px">
                      <Text textStyle="b1" color="gray.800">
                        Password
                      </Text>
                    </FormLabel>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
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
                <a href="https://www.google.com" target="_blank" ml="8px">
                  <Text ml="8px">Register</Text>
                </a>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}

export default LoginPage;
