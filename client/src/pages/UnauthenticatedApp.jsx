import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import RoomDetailPage from "./RoomDetailPage";
import BookingPage from "./BookingPage";
import AdminPage from "./AdminPage";

function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/roomdetail/:roomTypeId" element={<RoomDetailPage />} />
        <Route path="/booking" element={<BookingPage />} />
        {/* <Route path="/admin" element={<AdminPage />} /> */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
