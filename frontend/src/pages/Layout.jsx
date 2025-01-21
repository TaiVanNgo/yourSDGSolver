import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => (
  <div className="flex h-fit min-h-screen flex-col bg-backgroundColor">
    <div className="w-full bg-white shadow-xl">
      <Header />
    </div>

    <Outlet />
  </div>
);
export default Layout;
