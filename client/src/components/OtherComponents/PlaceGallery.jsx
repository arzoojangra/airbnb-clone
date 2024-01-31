import { useState } from "react";
import PlaceImg from "./PlaceImg";

export default function PlaceGallery({ placeDetails }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 min-w-full min-h-full">
        <div className="p-10 grid gap-4 bg-gray-200 text-center items-center">
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
                  src={photo.includes("https://") ? photo : `http://localhost:4000/uploads/` + photo}
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
    <div className="relative">
      <div className="grid gap-2 grid-cols-2 rounded-3xl overflow-hidden mt-5">
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
  );
}
