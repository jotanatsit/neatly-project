import React from "react";

const BookingContext = React.createContext();

function BookingProvider(props) {
  const bookingData = { A: 1, B: 2 };
  return (
    <BookingContext.Provider value={bookingData}>
      {props.children}
    </BookingContext.Provider>
  );
}

const useBooking = () => React.useContext(BookingContext);

export { BookingProvider, useBooking };
