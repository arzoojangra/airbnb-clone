import { Link, useLocation } from "react-router-dom";
import React from "react";
import PlaceImg from "../../components/OtherComponents/PlaceImg";

function SearchResult() {
  const location = useLocation();
  const places = location.state?.responseData || null;

  if (!places.length) {
    return (
      <div className="px-25 py-14 mt-10 text-xl text-center text-gray-500">
        Sorry no results found for you search...{" "}
        <p>You can try again searching...</p>
      </div>
    );
  }
  return (
    <div className="grid gap-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-20 py-14">
      {places.length > 0 &&
        places.map((place) => (
          <Link
            to={"/place/" + place._id}
            key={place._id}
            className="rounded-xl"
          >
            <div className="rounded flex">
              <PlaceImg
                place={place}
                classname="rounded-2xl object-cover aspect-square"
                index={0}
              />
            </div>

            <div className="ms-1">
              <div className="font-bold text-sm mt-3 mb-1">{place.address}</div>
              <div className="text-sm text-gray-500 truncate">
                {place.title}
              </div>
              <div className="font-bold text-sm flex items-center">
                <span className="text-base p-0 me-1">{"\u20B9"}</span>
                {place.price} per night
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default SearchResult;
