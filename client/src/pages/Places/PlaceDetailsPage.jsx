import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  } else
    return (
      <div className="mt-4 bg-gray-200 -mx-8 px-8 py-8">
        <h1 className="font-bold text-3xl">{placeDetails?.title}</h1>
        <a
          className="block my-2 font-semibold underline"
          target="_blank"
          href={"https://maps.google.com/?q=" + placeDetails?.address}
        >
          {placeDetails?.address}
        </a>
        <div className="relative">
          <div className="grid gap-2 grid-cols-[2fr_1fr]">
            <div>
              {placeDetails?.photos && (
                <div className="">
                  <img
                    className="aspect-square object-cover"
                    src={
                      "http://localhost:4000/uploads/" + placeDetails?.photos[0]
                    }
                  />
                </div>
              )}
            </div>
            <div className="grid">
              {placeDetails?.photos && (
                <img
                  className="aspect-square object-cover"
                  src={
                    "http://localhost:4000/uploads/" + placeDetails?.photos[1]
                  }
                />
              )}
              {placeDetails?.photos && (
                <div className="overflow-hidden">
                  <img
                    className="aspect-square object-cover relative"
                    src={
                      "http://localhost:4000/uploads/" + placeDetails?.photos[2]
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <button
            className=" flex gap-1 items-center absolute text-xs bottom-1 right-1 bg-white bg-opacity-70 rounded-2xl px-2 py-1 shadow shadow-md shadow-black"
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
      </div>
    );
}
