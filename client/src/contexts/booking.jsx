import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const BookingContext = React.createContext();

function BookingProvider(props) {
  const location = useLocation();
  const [bookingData, setBookingData] = useState(location.state);
  // location.state เป็น object ที่มี key-value ที่ส่งมาจากหน้า search booking หลังกดปุ่ม Book now

  // function สำหรับ reset object ให้เป็น initial value
  const resetBookingData = () => {
    setBookingData(location.state);
  };

  // function สำหรับเพิ่มข้อมูลเข้าไปใน object
  const addBookingData = (data) => {
    setBookingData({ ...location.state, ...data });
  };

  return (
    <BookingContext.Provider
      value={{ bookingData, addBookingData, resetBookingData }}
    >
      {props.children}
    </BookingContext.Provider>
  );
}

const useBooking = () => React.useContext(BookingContext);

export { BookingProvider, useBooking };

// useBooking() เป็น context ที่เกี่ยวกับการเก็บข้อมูลการ Booking
