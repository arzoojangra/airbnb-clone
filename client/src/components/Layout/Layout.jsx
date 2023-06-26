import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout(props) {
  return (
    <div className="flex flex-col w-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
