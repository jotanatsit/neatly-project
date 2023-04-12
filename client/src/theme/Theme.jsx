import { extendTheme } from "@chakra-ui/react";
import { Button } from "./Button";
import { Input } from "./Input";
import { Select } from "./SelectCountry";
import "@fontsource/noto-serif-display";
import "@fontsource/inter";

export const Theme = extendTheme({
  styles: {
    padding: "0px",
    margin: "0px",
    boxSizing: "border-box",
  },
  colors: {
    green: {
      100: "#F1F5F3",
      200: "#E6EBE9",
      300: "#D5DFDA",
      400: "#ABC0B4",
      500: "#81A08F",
      600: "#5D7B6A",
      700: "#465C50",
      800: "#2F3E35",
      900: "#171F1B",
    },
    orange: {
      100: "#FAEDE8",
      200: "#F9DACE",
      300: "#F3B59C",
      400: "#ED906B",
      500: "#E76B39",
      600: "#C14817",
      700: "#803010",
      800: "#631F04",
      900: "#401808",
    },
    gray: {
      100: "#F6F7FC",
      200: "#F1F2F6",
      300: "#E4E6ED",
      400: "#D6D9E4",
      500: "#C8CCDB",
      600: "#9AA1B9",
      700: "#646D89",
      800: "#424C6B",
      900: "#2A2E3F",
    },
    white: "#FFFFFF",
    black: "#000000",
    red: "#B61515",
    bg: "#F7F7FB",
  },
  textStyles: {
    h1: {
      fontFamily: "Noto Serif Display",
      fontStyle: "normal",
      fontSize: "88px",
      fontWeight: "500",
      lineHeight: "125%",
    },
    h2: {
      fontFamily: "Noto Serif Display",
      fontStyle: "normal",
      fontSize: "68px",
      fontWeight: "500",
      lineHeight: "125%",
    },
    h3: {
      fontFamily: "Noto Serif Display",
      fontStyle: "normal",
      fontSize: "44px",
      fontWeight: "500",
      lineHeight: "125%",
    },
    h4: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontSize: "28px",
      fontWeight: "600",
      lineHeight: "150%",
    },
    h5: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontSize: "20px",
      fontWeight: "600",
      lineHeight: "150%",
    },
    b1: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "150%",
    },
    b2: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontSize: "14px",
      fontWeight: "500",
      lineHeight: "150%",
    },
    b3: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontSize: "12px",
      fontWeight: "500",
      lineHeight: "150%",
    },
  },
  shadows: {
    neatly: "4px 4px 16px rgba(0, 0, 0, 0.08)",
  },
  components: {
    Button,
    Input,
    Select,
  },
});
