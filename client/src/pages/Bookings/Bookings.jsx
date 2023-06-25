import { useEffect, useState } from "react";
import AccountNavBar from "../Account/AccountNavBar";
import axios from "axios";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const { data } = axios.get("/bookings");
    setBookings(data);
  }, []);

  return (
    <div>
      <AccountNavBar />
      {bookings?.length > 0 &&
        bookings.map((booking) => <div>{booking._id}</div>)}
    </div>
  );
}
