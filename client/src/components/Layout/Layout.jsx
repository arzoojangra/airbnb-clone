import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export default function Layout(props) {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
