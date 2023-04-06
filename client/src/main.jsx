import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Theme } from './theme/Theme'


ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <ChakraProvider theme={Theme}>
         <App />
      </ChakraProvider>
   </React.StrictMode>,
)
