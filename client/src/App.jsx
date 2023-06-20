import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import Index from "./pages/Index/Index";
import Register from "./pages/Register/Register";
import axios from "axios";
import { UserContextProvider } from "./Context/UserContext";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
