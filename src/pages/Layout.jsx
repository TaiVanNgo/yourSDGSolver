import { Outlet } from "react-router-dom";

const Layout = () => (
  <div className="flex h-fit min-h-screen gap-8 bg-backgroundColor px-8">
    {/* <div className="min-h-screen w-[20%] bg-red-500"></div> */}
    <Outlet />
  </div>
);
export default Layout;
