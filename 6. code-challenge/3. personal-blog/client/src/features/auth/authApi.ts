import axiosInstance from "@/store/axiosInstance";
import { Login, SignUp } from "@/types/auth";

export const login = async (credentials: Login) => {
  return (await axiosInstance.post("/auth/login", credentials)).data;
};

export const signUp = async (credentials: SignUp) => {
  return (await axiosInstance.post("/auth/signup", credentials)).data;
};
