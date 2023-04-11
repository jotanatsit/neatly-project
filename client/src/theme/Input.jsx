import { defineStyleConfig } from '@chakra-ui/react'
import "@fontsource/inter"

export const Input = defineStyleConfig({
   baseStyle: {
      field: {
         fontFamily: 'Inter',
         fontStyle: "normal",
         fontWeight: "400",
         lineHeight: "16px",
         border: "1px solid",
         borderRadius: "4px",
         borderColor: "gray.400",
         bg: 'white',
         padding: "12px 16px 12px 12px",
      },
   },
   sizes: {
      md: {
         fontSize: "16px",
      }
   },
   variants: {
      outline: {
         field: {
            _focusVisible: { borderColor: "orange.400", boxShadow: "none" },
            _invalid: { borderColor: "red", boxShadow: "none" },
            _disabled: { bg: 'gray.200', borderColor: "gray.400", boxShadow: "none" }
         }
      }
   }
})