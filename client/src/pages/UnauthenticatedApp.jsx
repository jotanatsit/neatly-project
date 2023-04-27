import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import RoomDetailPage from "./RoomDetailPage";
import BookingPage from "./BookingPage";
import Card from "../Components/Card";

function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/roomdetail/:roomTypeId" element={<RoomDetailPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="*" element={<LoginPage />} />
        <Route path="/card" element={<Card />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
