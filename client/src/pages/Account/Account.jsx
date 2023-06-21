import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { NavLink, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "../Places/PlacesPage";

export default function Account() {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subPage } = useParams();
  if (subPage === undefined) {
    subPage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return <>Loading...</>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <nav className="w-full flex justify-center my-8  gap-2">
        <NavLink
          className={`inline-flex items-center gap-1 py-2 px-6 rounded-full ${
            subPage == "profile"
              ? "bg-primary text-white rounded-full"
              : "bg-gray-200"
          }`}
          to="/account/profile"
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
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          My Profile
        </NavLink>
        <NavLink
          className={`inline-flex items-center gap-1 py-2 px-6 rounded-full ${
            subPage == "bookings"
              ? "bg-primary text-white rounded-full"
              : "bg-gray-200"
          }`}
          to="/account/bookings"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
          My Bookings
        </NavLink>
        <NavLink
          className={`inline-flex itmes-center gap-1 py-2 px-6 rounded-full ${
            subPage == "places" ? "bg-primary text-white " : "bg-gray-200"
          }`}
          to="/account/places"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
            />
          </svg>
          My Accommodations
        </NavLink>
      </nav>

      {subPage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.fName + " " + user.lName} ({user.email})
          <button className="primary max-w-sm mt-3" onClick={logout}>
            Logout
          </button>
        </div>
      )}

      {subPage === "places" && <PlacesPage />}
    </div>
  );
}
