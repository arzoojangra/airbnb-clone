import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../../components/OtherComponents/AddressLink";
import PlaceGallery from "../../components/OtherComponents/PlaceGallery";
import { differenceInCalendarDays, format } from "date-fns";

import axios from "axios";

export default function BookingDetails() {
  const { id } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get("/fetchBooking/" + id).then((response) => {
        setBookingDetails(response.data);
        console.log(response);
      });
    }
  }, [id]);

  if (!bookingDetails) {
    return <>Loading...</>;
  }

  return (
    <div className="px-10 bg-gray-100">
      <div className="px-8 py-8">
        <h1 className="font-bold text-3xl">{bookingDetails.place.title}</h1>

        <AddressLink>{bookingDetails.place.address} </AddressLink>

        <PlaceGallery placeDetails={bookingDetails.place} />

        <div className="grid grid-cols-[2fr_1fr] bg-white shadow p-4 rounded-2xl mt-8 px-10 py-10">
          <div>
            <div className="font-bold text-3xl ms-1 mb-2 text-primary">
              Booking Details
            </div>

            <div className="flex justify-between w-3/4 my-2">
              <p className="text-base mt-2 flex gap-1 items-center">
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

                {format(new Date(bookingDetails.checkIn), "dd-mm-yyyy")}
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

                {format(new Date(bookingDetails.checkOut), "dd-mm-yyyy")}
              </p>
              <p className="text-base mt-2 flex gap-2">
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
                  new Date(bookingDetails.checkOut),
                  new Date(bookingDetails.checkIn)
                )}{" "}
                nights
              </p>
            </div>
            <div className="flex items-center gap-8">
              <p className="text-base mt-3 ">
                <b> Number of Guests: </b> {bookingDetails.numberOfGuests}
              </p>
            </div>
          </div>
          <p className="text-2xl text-center font-bold my-auto items-center">
            <b>Total price</b>
            <div className="mt-2 text-primary">
              <span className="font-bold text-2xl mx-1">{"\u20B9"}</span>
              {bookingDetails.price}
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}
