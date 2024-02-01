import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "../Places/PlacesPage";
import AccountNavBar from "./AccountNavBar";

export default function Account() {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subPage } = useParams();
  if (subPage === undefined) {
    subPage = "profile";
  }

  async function logout() {
    const logout = await axios.post("/logout");
    console.log(logout);
    if (logout.data.success) {
      setRedirect("/");
      setUser(null);
    }
  }

  if (!ready) {
    <div className="px-25 py-14 mt-10 text-xl text-center text-gray-500">
      Loading...
    </div>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNavBar subPage={subPage} />

      <div className="text-center max-w-lg mx-auto">
        Logged in as {user.fname + " " + user.lname} ({user.email})
        <button className="primary max-w-sm mt-3" onClick={logout}>
          Logout
        </button>
      </div>

      {subPage === "places" && <PlacesPage />}
    </div>
  );
}
