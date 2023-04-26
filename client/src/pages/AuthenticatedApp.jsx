import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import BookingPage from "./BookingPage";
import RoomDetailPage from "./RoomDetailPage";
import ProfilePage from "./ProfilePage";
import PaymentMethodPage from "./PaymentMethodPage";
// import BookingSummary from "./BookingSummaryPage";
import HistoryPage from "./HistoryPage";
import CancelPage from "./CancelPage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        {/* <Route path="/booking-summary" element={<BookingSummary />} /> */}
        <Route path="/roomdetail/:roomTypeId" element={<RoomDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/payment-method" element={<PaymentMethodPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
