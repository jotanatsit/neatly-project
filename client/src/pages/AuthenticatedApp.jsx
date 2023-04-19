import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import BookingPage from "./BookingPage";
import RoomDetailPage from "./RoomDetailPage";
import ProfilePage from "./ProfilePage";
import PaymentMethodPage from "./PaymentMethodPage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/roomdetail" element={<RoomDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/payment-method" element={<PaymentMethodPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
