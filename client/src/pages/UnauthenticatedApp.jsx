import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import RoomDetailPage from "./RoomDetailPage";
import BookingPage from "./BookingPage";
// import Card from "../Components/Card";
import Payment from "../Components/Payment";
import Completion from "../Components/Completion";

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
        {/* <Route path="/card" element={<Card />} /> */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/completion" element={<Completion />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
