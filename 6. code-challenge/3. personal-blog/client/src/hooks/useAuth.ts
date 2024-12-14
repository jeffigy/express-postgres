import { useStore } from "@/store/store";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  UserInfo: {
    email: string;
    name: string;
    userId: string;
  };
};

const useAuth = () => {
  const { token } = useStore.getState();

  if (!token) {
    return { email: "", name: "", userId: "" };
  }

  const decoded: DecodedToken = jwtDecode(token);
  const { email, name, userId } = decoded.UserInfo;

  return { email, name, userId };
};

export default useAuth;
