import { Button, Text, Input, Select, Flex } from "@chakra-ui/react";
import OptionCountry from "../Components/SelectCountry.jsx";
import Nav_user from "../Components/Nav_user.jsx";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

function ProfilePage() {
  const navigate = useNavigate();
  const [checkPicture, setCheckPicture] = useState(null);
  const [fileInputKey, setFileInputKey] = useState("");
  const [userData, setUserData] = useState({});
  const { userToken } = useAuth();

  async function getUserData() {
    console.log(userToken);
    // try {
    //   const response = await axios.get(`http://localhost:4000/${userToken.id}`);
    //   setUserData(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  }

  useEffect(() => {
    getUserData();
  }, []);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      id_number: "",
      birth_date: "",
      country: "",
      profile_picture: null,
    },
    onSubmit: async (values) => {
      const { fullname, email, id_number, birth_date, country } = values;

      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("id_number", id_number);
      formData.append("birth_date", birth_date);
      formData.append("country", country);
      formData.append("profile_picture", values.profile_picture);

      try {
        const response = await axios.put(
          `http://localhost:4000/${userToken.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.error(response.data);
        alert(response.data.message);
        // navigate("/profile");
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    },
  });

  const handleIdNumberChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, "");

    if (value.length > 0 && value.length <= 1) {
      value = value.replace(/^(\d{1})/, "$1-");
    } else if (value.length > 1 && value.length <= 5) {
      value = value.replace(/^(\d{1})(\d{0,4})/, "$1-$2");
    } else if (value.length > 5 && value.length <= 10) {
      value = value.replace(/^(\d{1})(\d{4})(\d{0,5})/, "$1-$2-$3");
    } else if (value.length > 10 && value.length <= 12) {
      value = value.replace(/^(\d{1})(\d{4})(\d{5})(\d{0,2})/, "$1-$2-$3-$4");
    } else if (value.length > 12) {
      value = value.replace(
        /^(\d{1})(\d{4})(\d{5})(\d{2})(\d{0,1})/,
        "$1-$2-$3-$4-$5"
      );
    }

    formik.setFieldValue("id_number", value);
  };

  const handleRemoveImage = (event) => {
    event.preventDefault();
    formik.setFieldValue("profile_picture", null);
    setCheckPicture(null);
    setFileInputKey(Date.now());
  };

  return (
    <div>
      <Nav_user />
      <form onSubmit={formik.handleSubmit}>
        <Flex
          bg="#F7F7FB"
          bgSize="cover"
          flexDirection="row"
          justifyContent="center"
        >
          <Flex
            bg="#F7F7FB"
            w="930px"
            h="840px"
            mt="80px"
            mb="80px"
            flexDirection="column"
          >
            <Flex
              w="930px"
              h="90px"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text textStyle="h2">Profile</Text>
              <Button
                w="176px"
                h="48px"
                type="submit"
                variant="primary"
                fontWeight="600px"
              >
                Update Profile
              </Button>
            </Flex>
            <Flex
              w="930px"
              h="400px"
              mt="70px"
              direction="column"
              borderBottom="1px"
              borderColor="gray.400"
            >
              <Text textStyle="h5" color="gray.600" mb="40px">
                Basic Information
              </Text>
              <Flex direction="column">
                <label htmlFor="fullname">
                  <Text mb="10px">Full Name</Text>
                </label>
                <Input
                  bg="#FFFFFF"
                  borderColor="gray.400"
                  id="fullname"
                  name="fullname"
                  type="fullname"
                  onChange={formik.handleChange}
                  value={formik.values.fullname}
                  placeholder="Enter your name and last name"
                />
              </Flex>
              <Flex direction="row" w="930px">
                <Flex direction="column" mt="30px">
                  <label htmlFor="email">
                    <Text mb="10px">Email</Text>
                  </label>
                  <Input
                    bg="#FFFFFF"
                    borderColor="gray.400"
                    w="439px"
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Enter your email"
                  />
                  <label htmlFor="birth_date">
                    <Text mb="10px" mt="30px">
                      Date of Birth
                    </Text>
                  </label>
                  <Input
                    bg="#FFFFFF"
                    borderColor="gray.400"
                    w="439px"
                    id="birth_date"
                    name="birth_date"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.birth_date}
                    placeholder="Select your date of birth"
                    color={formik.values.birth_date ? "gray.800" : "gray.500"}
                  />
                </Flex>
                <Flex direction="column" ml="50px" mt="30px">
                  <label htmlFor="id_number">
                    <Text mb="10px">ID Number</Text>
                  </label>
                  <Input
                    bg="#FFFFFF"
                    borderColor="gray.400"
                    w="439px"
                    id="id_number"
                    name="id_number"
                    type="tel"
                    onChange={handleIdNumberChange}
                    value={formik.values.id_number}
                    placeholder="Enter your ID Number"
                    maxLength={17}
                    minLength={17}
                    pattern="[0-9]{1}-[0-9]{4}-[0-9]{5}-[0-9]{2}-[0-9]{1}"
                  />
                  <label htmlFor="country">
                    <Text mb="10px" mt="30px">
                      Country
                    </Text>
                  </label>
                  <Select
                    bg="#FFFFFF"
                    borderColor="gray.400"
                    w="439px"
                    id="country"
                    name="country"
                    _focus={{
                      borderColor: "orange.400",
                      outlineStyle: "none",
                      color: "gray.800",
                      boxShadow: "none",
                    }}
                    colorScheme="gray.800"
                    onChange={formik.handleChange}
                    value={formik.values.country}
                    placeholder="Select your country"
                    color={formik.values.country ? "gray.800" : "gray.500"}
                  >
                    <OptionCountry />
                  </Select>
                </Flex>
              </Flex>
            </Flex>
            <Flex mt="40px" direction="column">
              <Text textStyle="h5" color="gray.600" mb="40px">
                Profile Picture
              </Text>
              <Flex
                w="167px"
                h="167px"
                bg="#F1F2F6"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                borderRadius={4}
              >
                <Flex flexDirection="column">
                  <Flex
                    width="167px"
                    height="167px"
                    bg="#F1F2F6"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius={4}
                  >
                    <input
                      key={fileInputKey}
                      id="file-upload"
                      name="image"
                      type="file"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "profile_picture",
                          event.target.files[0]
                        );
                        setCheckPicture(event.target.files[0]);
                      }}
                    />

                    {checkPicture === null ? (
                      <label htmlFor="file-upload">
                        <Text
                          color="orange.500"
                          fontSize={30}
                          textAlign="center"
                        >
                          +
                        </Text>
                        <Text
                          color="orange.500"
                          fontSize={14}
                          fontStyle="medium"
                        >
                          Upload photo
                        </Text>
                      </label>
                    ) : (
                      <Flex position="relative">
                        <img
                          src={URL.createObjectURL(checkPicture)}
                          alt={checkPicture.name}
                        />
                        <Button
                          onClick={(event) => handleRemoveImage(event)}
                          color="#FFFFFF"
                          bg="orange.600"
                          borderRadius="full"
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="center"
                          paddingLeft={1.0}
                          paddingRight={1.0}
                          paddingTop={0.25}
                          paddingBottom={0.25}
                          position="absolute"
                          right={-3.0}
                          top={-2.5}
                          size="xs"
                          _hover={{ bg: "orange.500", color: "white" }}
                          _focus={{ bg: "orange.700", color: "white" }}
                        >
                          x
                        </Button>
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </div>
  );
}

export default ProfilePage;
