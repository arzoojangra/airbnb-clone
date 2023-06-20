import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Register(props) {
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const RegisterUser = async (e) => {
    e.preventDefault();

    // console.log("email: ", email);
    // console.log("password: ", password);

    try {
      await axios.post("/register", {
        fName,
        lName,
        email,
        password,
      });
      alert("Registration successful! You can now login!");
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="mt-20 grow flex items-center justify-around">
      <div className="mb-60">
        <h1 className="text-4xl text-center mb-4">Register</h1>

        <form
          className="max-w-md mx-auto"
          onSubmit={(e) => {
            RegisterUser(e);
          }}
        >
          <input
            type="text"
            placeholder="First Name Here"
            value={fName}
            onChange={(e) => {
              setfName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Last Name Here"
            value={lName}
            onChange={(e) => {
              setlName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
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
      </div>
    </div>
  );
}

export default Register;
