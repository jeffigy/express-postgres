import { useStore } from "@/store/store";
import { Navigate, Outlet, useLocation } from "react-router";

const RequireAuth = () => {
  const { isAuthenicated } = useStore();
  const location = useLocation();
  return (
    <>
      {isAuthenicated ? (
        <Outlet />
      ) : (
        <Navigate state={{ from: location }} to={"/"} replace={true} />
      )}
    </>
  );
};

export default RequireAuth;
