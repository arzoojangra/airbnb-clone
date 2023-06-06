import { useState } from "react";
import { NavLink } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("email", email);
    console.log("password", password);
  };

  return (
    <div className="mt-20 grow flex items-center justify-around">
      <div className="mb-60">
        <h1 className="text-4xl text-center mb-4">Login</h1>

        <form
          className="max-w-md mx-auto"
          onSubmit={(e) => {
            handleSubmit(e);
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

export default Login;
