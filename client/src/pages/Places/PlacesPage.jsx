import { NavLink, useParams } from "react-router-dom";
import Perks from "./Perks";
import { useState } from "react";
import axios from "axios";

export default function PlacesPage() {
  const { action } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("");

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

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data } = await axios.post("/upload-by-link", {
      link: photoLink,
    });

    // console.log(res.data);

    setAddedPhotos((prev) => {
      return [...prev, data];
    });

    setPhotoLink("");
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
          <form>
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
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add using a link ......jpg"
                value={photoLink}
                onChange={(ev) => {
                  setPhotoLink(ev.target.value);
                }}
              />
              <button
                onClick={(ev) => {
                  addPhotoByLink(ev);
                }}
                className="bg-gray-200 px-4 text-sm rounded-2xl"
              >
                Add&nbsp;photo
              </button>
            </div>

            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => {
                  <div>
                    <img
                      className="rounded-2xl"
                      src={`http://localhost:4000/uploads/` + link}
                      alt={link}
                    />
                  </div>;
                })}
              <button className="flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 h-24 text-2xl text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </button>
            </div>

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
