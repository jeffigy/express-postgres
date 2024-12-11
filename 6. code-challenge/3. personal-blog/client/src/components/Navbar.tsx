import { NavLink } from "react-router";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="fixed top-0 z-10 flex w-full justify-center shadow">
      <div className="flex h-14 w-full max-w-screen-lg items-center justify-between px-3">
        <NavLink to={"/"}>Personal Blog</NavLink>
        <div className="space-x-1">
          <NavLink to={"/login"}>
            <Button className="rounded-full">Login</Button>
          </NavLink>
          <NavLink to={"/signup"}>
            <Button variant={"link"}>Signup</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
