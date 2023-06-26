import { Link, NavLink } from "react-router-dom";
import axios from "axios";

import AccountNavBar from "../Account/AccountNavBar";
import { useEffect, useState } from "react";
import PlaceImg from "../../components/ImageComponent/PlaceImg";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/fetchUserPlaces").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <>
      <AccountNavBar />

      {!places.length && (
        <div className="px-3">
          <div className="text-center">
            <NavLink
              to="/account/places/new"
              className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Add New Place
            </NavLink>
          </div>
        </div>
      )}

      <div className="px-10">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              key={place._id}
              to={`/account/places/` + place._id}
              className="flex cursor-pointer gap-4 bg-gray-100 p-2 rounded-2xl mb-3"
            >
              <div className="flex w-32 h-32 bg-gray-300 p-2 grow shrink-0 rounded-2xl">
                <PlaceImg
                  place={place}
                  classname="rounded-2xl w-full object-cover position-center"
                />
              </div>

              <div className="grow-0 shrink p-2">
                <h2 className="text-xl font-semibold">{place.title}</h2>
                <p className="text-sm mt-2 ">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
