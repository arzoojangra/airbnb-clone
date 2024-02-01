import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useFormik } from "formik";
import {
  RegistrationInitialValues,
  RegistrationValidationSchema,
} from "../../components/schemas/Validation";

export default function Register() {
  const initialValues = RegistrationInitialValues;
  const validationSchema = RegistrationValidationSchema;

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [seconds, setSeconds] = useState(-1);
  const [statusCode, setStatusCode] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
        // console.log(seconds);
      }
    }, 1000);
  }, [seconds]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        console.log(values);
        try {
          var registration = await axios.post("/register", values);
          if (!registration.data.success) {
            setMessage(registration.data.message);
            setStatusCode(registration.status);
          } else {
            console.log(registration);
            setMessage("Registration successful! You can now login!");
            setSuccess(true);
            setSeconds(5);
          }
        } catch (error) {
          alert("Something went wrong!");
        }
      },
    });

  if (!seconds) {
    return <Navigate to={"/login"} />;
  }
  if (success && message.length) {
    return (
      <>
        <h1 className=" mt-20 text-2xl text-center mb-4">{message}</h1>
        <div className="text-center py-2 text-gray-500">
          You will be redirected to login page in {seconds} seconds...
        </div>
      </>
    );
  }
  return (
    <div className="mt-20 grow flex items-center justify-around">
      <div className="mb-60">
        <h1 className="text-4xl text-center mb-4">Register</h1>

        <form className="max-w-md mx-auto" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="First Name Here"
            value={values.fname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.fname && touched.fname ? (
            <p className="text-primary py-1 px-3">{errors.fname}</p>
          ) : null}

          <input
            type="text"
            id="lname"
            name="lname"
            placeholder="Last Name Here"
            value={values.lname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.lname && touched.lname ? (
            <p className="text-primary py-1 px-3">{errors.lname}</p>
          ) : null}

          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? (
            <p className="text-primary py-1 px-3">{errors.email}</p>
          ) : null}

          {!success && statusCode == 203 ? (
            <div className="text-primary py-1 px-3">{message}</div>
          ) : (
            <></>
          )}

          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? (
            <p className="text-primary py-1 px-3">{errors.password}</p>
          ) : null}

          <button type="submit" className="primary">
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
            Already have an account?
            <NavLink to="/login" className="ms-1 underline text-black">
              Login here
            </NavLink>
          </div>
        </form>
        <div>
          {!success && statusCode != 200 && statusCode != 203 ? (
            <div className="text-primary py-1 px-3">{message}</div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
