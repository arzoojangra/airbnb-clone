import { useContext, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import {
  LoginInitialValues,
  LoginValidationSchema,
} from "../../components/schemas/Validation";
import { useFormik } from "formik";

export default function Login() {
  const initialValues = LoginInitialValues;
  const validationSchema = LoginValidationSchema;
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          const response = await axios.post("/login", values);
          if (response.data.success) {
            setUser(response.data.result);
            setRedirect(true);
            setSuccess(true);
          } else {
            setMessage(response.data.message);
          }
        } catch (error) {
          alert("Something went wrong!");
        }
      },
    });

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-20 grow flex items-center justify-around">
      <div className="mb-60">
        <h1 className="text-4xl text-center mb-4">Login</h1>

        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
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

          {!success ? (
            <div className="text-primary py-1 px-3">{message}</div>
          ) : (
            <></>
          )}

          <button type="submit" className="primary">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account?
            <NavLink to="/sign-up" className="ms-1 underline text-black">
              Register here
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
