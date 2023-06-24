import Perks from "./Perks";
import { useEffect, useState } from "react";
import axios from "axios";
import UploadPhoto from "./UploadPhoto";
import AccountNavBar from "../Account/AccountNavBar";
import { Navigate, useParams } from "react-router-dom";

export default function AddPlace() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios.get("/fetchPlace/" + id).then((response) => {
      const { data } = response;

      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

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

  async function savePlace(ev) {
    ev.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (id) {
      // update place
      await axios.put("/updatePlace", {
        id,
        ...placeData,
      });

      setRedirect(true);
    } else {
      // add new place
      await axios.post("/addPlace", {
        placeData,
      });

      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <>
      <AccountNavBar />
      <div className="px-20">
        <form onSubmit={savePlace}>
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

          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
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

            <div>
              <h3 className="mt-2 mb-1 ms-2">Price per Night</h3>
              <input
                type="number"
                placeholder="1000"
                value={price}
                onChange={(ev) => {
                  setPrice(ev.target.value);
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
    </>
  );
}
