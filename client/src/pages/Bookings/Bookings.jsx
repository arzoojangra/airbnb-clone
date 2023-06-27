import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNavBar from "../Account/AccountNavBar";
import axios from "axios";
import PlaceImg from "../../components/OtherComponents/PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const response = axios.get("/bookings").then(({ data }) => {
      setBookings(data);
      console.log(data);
    });
  }, []);

  return (
    <div>
      <AccountNavBar />

      <div className="px-20">
        {bookings.length > 0 &&
          bookings.map((booking) => (
            <Link
              key={booking._id}
              to={`/account/bookings/` + booking._id}
              className="grid grid-cols-[1fr_3fr] cursor-pointer gap-4 bg-gray-100 p-2 rounded-2xl mb-3"
            >
              <div className="flex h-32 bg-gray-300 p-2 grow shrink-0 rounded-2xl">
                <PlaceImg
                  place={booking.place}
                  classname="rounded-2xl w-full object-cover position-center"
                />
              </div>

              <div className="grow-0 shrink p-2">
                <h2 className="text-xl font-semibold">{booking.place.title}</h2>
                <div className="flex justify-between w-1/2">
                  <p className="text-sm mt-2 flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                      />
                    </svg>
                    {format(new Date(booking.checkIn), "dd-mm-yyyy")}
                    <span className="font-bold">to</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                      />
                    </svg>

                    {format(new Date(booking.checkOut), "dd-mm-yyyy")}
                  </p>
                  <p className="text-sm mt-2 flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                    {differenceInCalendarDays(
                      new Date(booking.checkOut),
                      new Date(booking.checkIn)
                    )}{" "}
                    nights
                  </p>
                </div>
                <p className="text-sm mt-2 ">
                  <b> Number of Guests: </b> {booking.numberOfGuests}
                </p>

                <p className="text-sm mt-2 items-center">
                  <b>Total price:</b>
                  <span className="font-bold text-base ms-1">{"\u20B9"}</span>
                  {booking.price}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
