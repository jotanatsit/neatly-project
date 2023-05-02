import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const BookingContext = React.createContext();

function BookingProvider(props) {
  // location.state เป็น object ที่มี key-value ที่ส่งมาจากหน้า search booking หลังกดปุ่ม Book now

  const [bookingData, setBookingData] = useState({});
  const [step, setStep] = useState(["current", "none", "none"]);
  const [bookingReq, setBookingReq] = useState([]);

  // function สำหรับ reset object ให้เป็น initial value
  const resetBookingData = () => {
    setBookingData({});
  };

  // function สำหรับเพิ่มข้อมูลเข้าไปใน object
  const addBookingData = (data) => {
    setBookingData({ ...data });
  };

  // function สำหรับการ reset step ให้เป็น initial value
  const resetStepPayment = () => {
    setStep(["current", "none", "none"]);
  };

  // function สำหรับจัดการ step การ booking เพื่อใช้ในการ render components
  const setStepPayment = (arr) => {
    setStep(arr);
  };

  // function สำหรับการ set special requests
  const setBookingRequests = (req) => {
    setBookingReq(req);
  };

  // function สำหรับการ reset special request
  const resetBookingRequests = () => {
    setBookingReq([]);
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        addBookingData,
        resetBookingData,
        step,
        setStepPayment,
        resetStepPayment,
        bookingReq,
        setBookingRequests,
        resetBookingRequests,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
}

const useBooking = () => React.useContext(BookingContext);

export { BookingProvider, useBooking };

// useBooking() เป็น context ที่เกี่ยวกับการเก็บข้อมูลการ Booking
