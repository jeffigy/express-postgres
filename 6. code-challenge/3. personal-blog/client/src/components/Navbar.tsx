import { NavLink, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useStore } from "@/store/store";
import { useLogoutMutation } from "@/features/auth/authMutation";
import { Loader } from "lucide-react";

const Navbar = () => {
  const { isAuthenicated } = useStore();

  return (
    <div className="fixed top-0 z-10 flex w-full justify-center shadow">
      <div className="flex h-14 w-full max-w-screen-lg items-center justify-between px-3">
        <NavLink to={"/"}>Personal Blog</NavLink>
        {isAuthenicated ? <DashNav /> : <AuthNav />}
      </div>
    </div>
  );
};

export default Navbar;

const DashNav = () => {
  const navigate = useNavigate();
  const { isPending, mutate: logout } = useLogoutMutation();

  const handleLogout = async () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="space-x-1">
      <NavLink to={"/my-blogs"}>
        <Button>My blogs</Button>
      </NavLink>

      <Button onClick={handleLogout} variant={"link"}>
        {isPending ? (
          <>
            <Loader /> Logging out...
          </>
        ) : (
          "Log out"
        )}
      </Button>
    </div>
  );
};

const AuthNav = () => {
  return (
    <div className="space-x-1">
      <NavLink to={"/login"}>
        <Button className="rounded-full">Login</Button>
      </NavLink>
      <NavLink to={"/signup"}>
        <Button variant={"link"}>Signup</Button>
      </NavLink>
    </div>
  );
};
