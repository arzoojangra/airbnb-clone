import Perks from "./Perks";
import { useEffect, useState } from "react";
import axios from "axios";
import UploadPhoto from "./UploadPhoto";
import AccountNavBar from "../Account/AccountNavBar";
import { Navigate, useParams } from "react-router-dom";
import {
  AccomodationsInitialValues,
  AccomodationsValidationSchema,
} from "../../components/schemas/Validation";
import { useFormik } from "formik";

export default function AddPlace() {
  const { id } = useParams();

  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState("");
  const [redirect, setRedirect] = useState(false);

  const initialValues = AccomodationsInitialValues;
  const validationSchema = AccomodationsValidationSchema;

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        values.addedPhotos = addedPhotos;
        values.perks = perks;

        if (id) {
          // update place
          await axios.put("/updatePlace", {
            id,
            ...values,
          });

          setRedirect(true);
        } else {
          // add new place
          await axios.post("/addPlace", values);

          setRedirect(true);
        }
      },
    });

  useEffect(() => {
    if (!id) return;

    axios.get("/fetchPlace/" + id).then((response) => {
      const { data } = response;

      values.title = data.title;
      values.address = data.address;
      setAddedPhotos(data.photos);
      values.description = data.description;
      setPerks(data.perks);
      values.extraInfo = data.extraInfo;
      values.checkIn = data.checkIn;
      values.checkOut = data.checkOut;
      values.maxGuests = data.maxGuests;
      values.price = data.price;
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

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <>
      <AccountNavBar />
      <div className="px-20">
        <form onSubmit={handleSubmit}>
          {preInput(
            "Title",
            "Title for your place, should be short and attractive"
          )}
          <input
            type="text"
            placeholder="Title, for example: My lovely apt"
            value={values.title}
            id="title"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.title && touched.title ? (
            <p className="text-primary py-1 px-3">{errors.title}</p>
          ) : null}

          {preInput("Address", "Address for this place")}
          <input
            type="text"
            placeholder="Address"
            value={values.address}
            id="address"
            name="address"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.address && touched.address ? (
            <p className="text-primary py-1 px-3">{errors.address}</p>
          ) : null}

          {preInput("Photos", "Because more = better")}
          <UploadPhoto addedPhotos={addedPhotos} onChange={setAddedPhotos} />

          {preInput("Description", "Tell us something about this place...")}

          <textarea
            value={values.description}
            id="description"
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.description && touched.description ? (
            <p className="text-primary py-1 px-3">{errors.description}</p>
          ) : null}

          {preInput("Perks and facilities", "What does this place offers")}
          <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Perks selected={perks} onChange={setPerks} />
          </div>

          {preInput("Extra Info", "House rules, etc.")}
          <textarea
            value={values.extraInfo}
            id="extraInfo"
            name="extraInfo"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.extraInfo && touched.extraInfo ? (
            <p className="text-primary py-1 px-3">{errors.extraInfo}</p>
          ) : null}

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
                value={values.checkIn}
                id="checkIn"
                name="checkIn"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.checkIn && touched.checkIn ? (
                <p className="text-primary py-1 px-3">{errors.checkIn}</p>
              ) : null}
            </div>

            <div>
              <h3 className="mt-2 mb-1 ms-2">Check out time</h3>
              <input
                type="text"
                placeholder="20:00"
                value={values.checkOut}
                id="checkOut"
                name="checkOut"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.checkOut && touched.checkOut ? (
                <p className="text-primary py-1 px-3">{errors.checkOut}</p>
              ) : null}
            </div>

            <div>
              <h3 className="mt-2 mb-1 ms-2">Maximum number of guests</h3>
              <input
                type="number"
                min={1}
                placeholder="02"
                value={values.maxGuests}
                id="maxGuests"
                name="maxGuests"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.maxGuests && touched.maxGuests ? (
                <p className="text-primary py-1 px-3">{errors.maxGuests}</p>
              ) : null}
            </div>

            <div>
              <h3 className="mt-2 mb-1 ms-2">Price per Night</h3>
              <input
                type="number"
                min={100}
                placeholder="1000"
                value={values.price}
                id="price"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.price && touched.price ? (
                <p className="text-primary py-1 px-3">{errors.price}</p>
              ) : null}
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
