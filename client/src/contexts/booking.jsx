import React from "react";
import { useLocation } from "react-router-dom";

const BookingContext = React.createContext();

function BookingProvider(props) {
  const location = useLocation();
  const bookingData = location.state?.bookingData;
  // // bookingData เป็น object ที่มี key-value เป็น state ที่ส่งมาจากหน้า search booking หลังกดปุ่ม Book now

  return (
    <BookingContext.Provider value={bookingData}>
      {props.children}
    </BookingContext.Provider>
  );
}

const useBooking = () => React.useContext(BookingContext);

export { BookingProvider, useBooking };
