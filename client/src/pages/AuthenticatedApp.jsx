import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import BookingPage from "./BookingPage";
import RoomDetailPage from "./RoomDetailPage";
import ProfilePage from "./ProfilePage";
import PaymentMethodPage from "./PaymentMethodPage";
import BookingSummary from "./BookingSummaryPage";
import HistoryPage from "./HistoryPage";
import CancelPage from "./CancelPage";
import { BookingProvider } from "../contexts/booking.jsx";

function AuthenticatedApp() {
  return (
    <div className="App">
      <BookingProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/booking-summary" element={<BookingSummary />} />
          <Route path="/roomdetail/:roomTypeId" element={<RoomDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/payment-method" element={<PaymentMethodPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BookingProvider>
    </div>
  );
}

export default AuthenticatedApp;
