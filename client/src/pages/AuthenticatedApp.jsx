import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import BookingPage from "./BookingPage";
import RoomDeatailPage from "./RoomDetailPage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/roomdetail" element={<RoomDeatailPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
