import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";
import PlaceGallery from "../../components/OtherComponents/PlaceGallery";
import AddressLink from "../../components/OtherComponents/AddressLink";

export default function PlaceDetailsPage() {
  const { id } = useParams();
  const [placeDetails, setPlaceDetails] = useState(null);

  useEffect(() => {
    axios.get(`/fetchPlace/${id}`).then((response) => {
      setPlaceDetails(response.data);
    });
  }, [id]);

  if (!placeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-10 bg-gray-100">
      <div className="px-10 py-10">
        <h1 className="font-bold text-xl md:text-3xl">{placeDetails?.title}</h1>

        <AddressLink>{placeDetails.address} </AddressLink>

        <PlaceGallery placeDetails={placeDetails} />

        <div className="mx-2 my-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div className="border border-gray-400 py-2 px-4 rounded-2xl">
            <div className="my-4">
              <h2 className="font-semibold text-3xl mb-2">Description</h2>
              {placeDetails.description}
            </div>
            <b> Check-in Time: </b> {placeDetails.checkIn}:00
            <br />
            <b> Check-out Time: </b> {placeDetails.checkOut}:00
            <br />
            <b> Max number of guests: </b> {placeDetails.maxGuests}
          </div>
          <BookingWidget place={placeDetails} />
        </div>
      </div>
      <div className="mx-12 my-6">
        <h2 className="text-gray-700 font-semibold text-2xl mb-2">
          Extra Info
        </h2>
        <div className="text-gray-600">{placeDetails.extraInfo}</div>
      </div>
    </div>
  );
}
