import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-backgroundColor h-screen p-10">
      <Outlet />
    </div>
  );
};
export default Layout;
