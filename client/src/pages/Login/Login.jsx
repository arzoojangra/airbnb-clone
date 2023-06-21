import { useContext, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const LoginUser = async (e) => {
    e.preventDefault();

    // console.log("email: ", email);
    // console.log("password: ", password);

    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });

      setUser(data);
      console.log(data);

      alert("Login successfull!");
      setRedirect(true);
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-20 grow flex items-center justify-around">
      <div className="mb-60">
        <h1 className="text-4xl text-center mb-4">Login</h1>

        <form
          className="max-w-md mx-auto"
          onSubmit={(e) => {
            LoginUser(e);
          }}
        >
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
