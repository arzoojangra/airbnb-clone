import { NavLink, Navigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import { useState } from "react";
import axios from "axios";
import UploadPhoto from "./UploadPhoto";

export default function PlacesPage() {
  const { action } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [redirectToPlacesPage, setRedirectToPlacesPage] = useState(false);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4 ms-1">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm ms-1">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addNewPlace(ev) {
    ev.preventDefault();

    await axios.post("/addPlace", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });

    setRedirect(true);
  }

  if (redirect && !action) {
    return <Navigate to={"/account/places"} />;
  }

  return (
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

      {action === "new" && (
        <div className="px-20">
          <form onSubmit={addNewPlace}>
            {preInput(
              "Title",
              "Title for your place, should be short and attractive"
            )}
            <input
              type="text"
              placeholder="Title, for example: My lovely apt"
              value={title}
              onChange={(ev) => {
                setTitle(ev.target.value);
              }}
            />

            {preInput("Address", "Address for this place")}
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(ev) => {
                setAddress(ev.target.value);
              }}
            />

            {preInput("Photos", "Because more = better")}
            <UploadPhoto addedPhotos={addedPhotos} onChange={setAddedPhotos} />

            {preInput("Description", "Tell us something about this place...")}

            <textarea
              value={description}
              onChange={(ev) => {
                setDescription(ev.target.value);
              }}
            />

            {preInput("Perks and facilities", "What does this place offers")}
            <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <Perks selected={perks} onChange={setPerks} />
            </div>

            {preInput("Extra Info", "House rules, etc.")}
            <textarea
              value={extraInfo}
              onChange={(ev) => {
                setExtraInfo(ev.target.value);
              }}
            />

            {preInput(
              "Check in & check out time",
              "Add check in and check out timings, remember to have some time window to clean the room in between guests arrive."
            )}

            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 mb-1 ms-2">Check in time</h3>
                <input
                  type="text"
                  placeholder="14:00"
                  value={checkIn}
                  onChange={(ev) => {
                    setCheckIn(ev.target.value);
                  }}
                />
              </div>

              <div>
                <h3 className="mt-2 mb-1 ms-2">Check out time</h3>
                <input
                  type="text"
                  placeholder="20:00"
                  value={checkOut}
                  onChange={(ev) => {
                    setCheckOut(ev.target.value);
                  }}
                />
              </div>

              <div>
                <h3 className="mt-2 mb-1 ms-2">Maximum number of guests</h3>
                <input
                  type="number"
                  placeholder="02"
                  value={maxGuests}
                  onChange={(ev) => {
                    setMaxGuests(ev.target.value);
                  }}
                />
              </div>
            </div>

            <div className="text-center mt-2">
              <button className="primary my-4 max-w-xs font-bold text-base">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
