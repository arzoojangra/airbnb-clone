import { NavLink, useParams } from "react-router-dom";

import AddPlace from "./AddPlace";
import AccountNavBar from "../Account/AccountNavBar";

export default function PlacesPage() {
  const { action } = useParams();

  return (
    <>
      <AccountNavBar />
      <div className="px-3">
        {action !== "new" && (
          <div className="text-center">
            <NavLink
              to="/account/places/new"
              className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
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
        )}

        {action === "new" && <AddPlace />}
      </div>
    </>
  );
}
