import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Theme } from "./theme/Theme";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authentication";
import jwtInterceptor from "./utils/jwtInterceptor";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

jwtInterceptor();

(async () => {
  const { publishableKey } = await fetch(
    "http://localhost:4000/payment/config"
  ).then((r) => r.json());
  const stripePromise = loadStripe(publishableKey);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider theme={Theme}>
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
})();
