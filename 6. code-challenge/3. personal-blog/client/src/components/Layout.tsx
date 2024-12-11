import { Outlet } from "react-router";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex w-screen flex-col">
      <Navbar />
      <div className="mt-14 p-5">
        {" "}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
