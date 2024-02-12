import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout(props) {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="flex-grow">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
