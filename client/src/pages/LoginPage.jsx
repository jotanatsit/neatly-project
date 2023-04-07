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
    // <Flex>
    //   <form>
    //     <h1>Login</h1>
    //     <div>
    //       <label>
    //         Username or Email
    //         <input
    //           id="username"
    //           name="username"
    //           type="text"
    //           placeholder="Enter your Username or Email"
    //           onChange={(event) => {
    //             setUsername(event.target.value);
    //           }}
    //           value={username}
    //         />
    //       </label>
    //     </div>
    //     <div>
    //       <label>
    //         Password
    //         <input
    //           id="password"
    //           name="password"
    //           type="password"
    //           placeholder="Enter your password"
    //           onChange={(event) => {
    //             setPassword(event.target.value);
    //           }}
    //           value={password}
    //         />
    //       </label>
    //     </div>
    //     <div>
    //       <Button variant="primary" height="48px" width="452px" type="submit">
    //         Login
    //       </Button>
    //     </div>
    // <div>
    //   <span>Don't have and account yet?</span>
    //   <a href="https://www.google.com" target="_blank">
    //     Register
    //   </a>
    // </div>
    //   </form>
    // </Flex>
    <Flex direction="column">
      <Text textStyle="h1" color="black">
        Log In
      </Text>
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
            <Field type="email" name="email" validate={validateUserName}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                  Height="48px"
                  width="452px"
                >
                  <FormLabel>Username or Email</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your username or email"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field type="password" name="password" validate={validatePassword}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                  Height="48px"
                  width="452px"
                >
                  <FormLabel>Password</FormLabel>
                  <Input {...field} placeholder="Enter your password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button variant="primary" Height="48px" width="452px">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <div>
        <span>Don't have and account yet?</span>
        <a href="https://www.google.com" target="_blank">
          Register
        </a>
      </div>
    </Flex>
  );
}

export default LoginPage;
