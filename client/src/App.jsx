import './App.css'
import BookingPage from './pages/BookingPage'
import RoomDetailPage from './pages/RoomDetailPage'
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from './pages/Homepage';
import RegisterPage from "./pages/RegisterPage";

function App() {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/register" element={<RegisterPage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/roomdetail" element={<RoomDetailPage />} />
         <Route path="/booking" element={<BookingPage />} />
      </Routes>
   );
}

export default App;
