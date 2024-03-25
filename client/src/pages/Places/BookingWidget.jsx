import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { Navigate } from "react-router-dom";
import {
  BookingInitialValues,
  BookingValidationSchema,
} from "../../components/schemas/Validation";
import { useFormik } from "formik";

export default function BookingWidget({ place }) {
  const [minDate, setMinDate] = useState(() => {
    // Calculate tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [minDate2, setMinDate2] = useState(() => {
    // Calculate tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow.toISOString().split('T')[0];
  });
  const initialValues = BookingInitialValues;
  const validationSchema = BookingValidationSchema;

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        values.place = place._id;
        values.price = numberOfNights * place.price;
        const booking = await axios.post("/booking", values);
        if(booking.data.success){
          setRedirect(`/account/bookings/${booking.data.result._id}`);
        }
        else{
          if(booking.status == 203){
            setRedirect("/login");
            alert(booking.data.message);
          }
        }
      },
    });

  const [redirect, setRedirect] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      values.name = user.fname + " " + user.lname;
    }
  }, [user]);

  let numberOfNights = 0;
  if (values.checkIn && values.checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(values.checkOut),
      new Date(values.checkIn)
    );
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: <span className="text-2xl p-0 me-1">{"\u20B9"}</span>
        {place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex flex-col md:flex-row">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input
              type="date"
              value={values.checkIn}
              id="checkIn"
              name="checkIn"
              onChange={handleChange}
              onBlur={handleBlur}
              min={minDate}
            />
            {errors.checkIn && touched.checkIn ? (
              <p className="text-primary py-1">{errors.checkIn}</p>
            ) : null}
          </div>

          <div className="py-3 px-4 md:border-l sm:border-t md:border-t-0">
            <label>Check out:</label>
            <input
              type="date"
              value={values.checkOut}
              id="checkOut"
              name="checkOut"
              onChange={handleChange}
              onBlur={handleBlur}
              min={minDate2}
            />
            {errors.checkOut && touched.checkOut ? (
              <p className="text-primary py-1">{errors.checkOut}</p>
            ) : null}
          </div>
        </div>

        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input
            type="number"
            value={values.numberOfGuests}
            id="numberOfGuests"
            name="numberOfGuests"
            min={1}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.numberOfGuests && touched.numberOfGuests ? (
            <p className="text-primary py-1 px-3">{errors.numberOfGuests}</p>
          ) : null}
        </div>

        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              type="text"
              value={values.name}
              id="name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name ? (
              <p className="text-primary py-1 px-3">{errors.name}</p>
            ) : null}

            <label>Phone number:</label>
            <input
              type="tel"
              value={values.phone}
              id="phone"
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phone && touched.phone ? (
              <p className="text-primary py-1 px-3">{errors.phone}</p>
            ) : null}
          </div>
        )}
      </div>
      <button onClick={handleSubmit} className="primary mt-4" type="submit">
        Book this place
        {numberOfNights > 0 && (
          <span className="text-base mx-1">
            for {"\u20B9"}
            {numberOfNights * place.price}
          </span>
        )}
      </button>
    </div>
  );
}
