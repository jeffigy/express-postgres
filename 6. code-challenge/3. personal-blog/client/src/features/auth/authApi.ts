import axiosInstance from "@/store/axiosInstance";
import { Login, SignUp } from "@/types/auth";

export const login = async (credentials: Login) => {
  return (await axiosInstance.post("/auth/login", credentials)).data;
};

export const signUp = async (credentials: SignUp) => {
  return (await axiosInstance.post("/auth/signup", credentials)).data;
};

export const refreshUser = async () => {
  return (await axiosInstance.get("/auth/refresh")).data;
};

export const logout = async () => {
  return (await axiosInstance.post("/auth/logout")).data;
};
