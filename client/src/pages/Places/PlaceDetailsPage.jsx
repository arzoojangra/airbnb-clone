import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";
import PlaceImg from "../../components/ImageComponent/PlaceImg";

export default function PlaceDetailsPage() {
  const { id } = useParams();
  const [placeDetails, setPlaceDetails] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    axios.get(`/fetchPlace/${id}`).then((response) => {
      setPlaceDetails(response.data);
    });
  }, [id]);

  if (!placeDetails) {
    return <div>Loading...</div>;
  }

  if (showAllPhotos) {
    return (
      <div className="absolute bg-gray-200 min-w-full">
        <div className="p-10 grid gap-4 text-center items-center">
          <div>
            <h2 className="text-3xl mx-auto">Photos of {placeDetails.title}</h2>
            <button
              className="flex items-center gap-1 fixed top-10 right-10 bg-gray-600 bg-opacity-70 rounded-2xl p-1"
              onClick={() => {
                setShowAllPhotos(false);
              }}
            >
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
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Close
            </button>
          </div>

          {placeDetails?.photos?.length > 0 &&
            placeDetails.photos.map((photo) => (
              <div>
                <img
                  src={"http://localhost:4000/uploads/" + photo}
                  alt=""
                  className="h-1/5 w-1/2 mx-auto rounded-xl"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 px-8 py-8">
      <h1 className="font-bold text-3xl">{placeDetails?.title}</h1>
      <a
        className="block my-2 font-semibold underline flex gap-1 items-center"
        target="_blank"
        href={"https://maps.google.com/?q=" + placeDetails?.address}
      >
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
            d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
          />
        </svg>

        {placeDetails?.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-2 rounded-3xl overflow-hidden">
          <div>
            <PlaceImg
              place={placeDetails}
              classname="aspect-square cursor-pointer object-cover max-h-min"
              index={0}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid">
              <PlaceImg
                place={placeDetails}
                classname="aspect-square cursor-pointer object-cover"
                index={1}
              />

              <div className="overflow-hidden">
                <PlaceImg
                  place={placeDetails}
                  classname="aspect-square cursor-pointer object-cover relative top-2"
                  index={1}
                />
              </div>
            </div>
            <div className="grid">
              <PlaceImg
                place={placeDetails}
                classname="aspect-square cursor-pointer object-cover"
                index={3}
              />
              <PlaceImg
                place={placeDetails}
                classname="aspect-square cursor-pointer object-cover relative top-2"
                index={4}
              />
            </div>
          </div>
        </div>
        <button
          className="flex gap-1 items-center absolute text-xs bottom-3 right-2 bg-white bg-opacity-70 rounded-2xl px-2 py-1 shadow shadow-md shadow-black"
          onClick={() => {
            setShowAllPhotos(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Show more photos
        </button>
      </div>

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
      <div className="mx-3 mt-6">
        <h2 className="text-gray-700 font-semibold text-2xl mb-2">
          Extra Info
        </h2>
        <div className="text-gray-600">{placeDetails.extraInfo}</div>
      </div>
    </div>
  );
}
