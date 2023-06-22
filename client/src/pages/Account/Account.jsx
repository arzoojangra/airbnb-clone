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
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return <>Loading...</>;
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
        Logged in as {user.fName + " " + user.lName} ({user.email})
        <button className="primary max-w-sm mt-3" onClick={logout}>
          Logout
        </button>
      </div>

      {subPage === "places" && <PlacesPage />}
    </div>
  );
}
