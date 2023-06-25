import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import Index from "./pages/Index/Index";
import Register from "./pages/Register/Register";
import axios from "axios";
import { UserContextProvider } from "./Context/UserContext";
import Account from "./pages/Account/Account";
import PlacesPage from "./pages/Places/PlacesPage";
import AddPlace from "./pages/Places/AddPlace";
import PlaceDetailsPage from "./pages/Places/PlaceDetailsPage";
import Bookings from "./pages/Bookings/Bookings";
import BookingDetails from "./pages/Bookings/BookingDetails";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/bookings" element={<Bookings />} />
          <Route path="/account/booking/:id" element={<BookingDetails />} />
          <Route path="/account/places/new" element={<AddPlace />} />
          <Route path="/account/places/:id" element={<AddPlace />} />
          <Route path="/place/:id" element={<PlaceDetailsPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}
