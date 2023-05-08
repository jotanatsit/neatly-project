import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import Nav_user from "../Components/Nav_user";

function ProcessingPage() {
  const navigate = useNavigate();

  const [showSpinner, setShowSpinner] = useState(true);
  const runTimeSpinner = () => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 1500);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    runTimeSpinner();
  }, []);

  return (
    <Flex direction="column" w="1440px" bgColor="bg" m="auto" h="100%">
      <Flex position="fixed" zIndex="10">
        <Nav_user />
      </Flex>

      <Flex
        direction="column"
        m="40px"
        h="100vh"
        justify="center"
        align="center"
        gap="40px"
      >
        <Spinner
          color="orange.500"
          thickness="10px"
          emptyColor="gray.300"
          h="150px"
          w="150px"
        />
        <Text textStyle="h5" color="green.700" textAlign="center">
          Your payment is successful <br />
          Waiting for booking process...
        </Text>
      </Flex>
      {showSpinner === false ? navigate("/succeed") : null}
    </Flex>
  );
}
export default ProcessingPage;
