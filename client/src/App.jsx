import './App.css'

import RegisterPage from "./pages/RegisterPage"
import LoginPage from './pages/LoginPage'
import { BrowserRouter, Routes, Route } from "react-router-dom"


import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

   return (

      <BrowserRouter>
         <Routes>
            
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
           
         </Routes>
      </BrowserRouter>

   )
}

export default App;
