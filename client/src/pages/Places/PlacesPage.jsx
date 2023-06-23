import { Link, NavLink } from "react-router-dom";
import axios from "axios";

import AccountNavBar from "../Account/AccountNavBar";
import { useEffect, useState } from "react";

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
      {/* <div className="px-3">
        <div className="text-center flex float-right pe-10 pt-0">
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
      </div> */}

      <div className="px-10">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              // key={place._id}
              to={`/account/places/` + place._id}
              className="flex cursor-pointer gap-4 bg-gray-100 p-2 rounded-2xl mb-3"
            >
              <div className="flex w-32 h-32 bg-gray-300 p-2 grow shrink-0 rounded-2xl">
                {place.photos.length > 0 && (
                  <img
                    className="rounded-2xl w-full object-cover position-center"
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    alt=""
                  />
                )}
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
