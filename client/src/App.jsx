import './App.css'
import HomePage from './pages/Homepage'
import BookingPage from './pages/BookingPage'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import RoomDetailPage from './pages/RoomDetailPage'


function App() {

   return (

      <BrowserRouter>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/roomdetail" element={<RoomDetailPage />} />
            <Route path="/booking" element={<BookingPage />} />
            {/* <Route path="/register" element={<RegisterPage />} /> */}
            {/* <Route path="/login" element={<LoginPage />} /> */}
         </Routes>
      </BrowserRouter>

   )
}

export default App
