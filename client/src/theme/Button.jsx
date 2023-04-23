import { defineStyleConfig } from "@chakra-ui/react";
import "@fontsource/open-sans";

export const Button = defineStyleConfig({
  baseStyle: {
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "16px",
    textAlign: "center",
    borderRadius: "4px",
  },
  sizes: {
    md: {
      fontSize: "16px",
      padding: "16px 32px",
    },
  },
  variants: {
    primary: {
      color: "white",
      bg: "orange.600",
      _hover: { bg: "orange.500", color: "white" },
      _focus: { bg: "orange.700", color: "white" },
    },
    secondary: {
      color: "orange.500",
      bg: "white",
      border: "1px solid",
      borderColor: "orange.500",
      _hover: {
        bg: "white",
        color: "orange.400",
        border: "1px solid",
        borderColor: "orange.400",
      },
      _focus: {
        bg: "white",
        color: "orange.600",
        border: "1px solid",
        borderColor: "orange.600",
      },
    },
    ghost: {
      padding: "4px 8px",
      color: "orange.500",
      _hover: { bg: "none", color: "orange.400" },
      _focus: { bg: "none", color: "orange.400" },
    },
    disabledPrimary: {
      _hover: {},
      _disabled: { bg: "gray.300", color: "gray.600" },
    },
    disabledSecondary: {
      _hover: {},
      _disabled: {
        bg: "gray.300",
        color: "gray.400",
        border: "1px solid",
        borderColor: "gray.300",
      },
    },
    disabledGhost: {
      padding: "4px 8px",
      _hover: {},
      _disabled: { color: "gray.500" },
    },
  },
});
