import axios from "axios";
import { useStore } from "./store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useStore.getState();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config; // request that caused the error
    const { token, setCredentials, clearCredentials } = useStore.getState();

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (token) {
        try {
          const { data } = await axiosInstance.get("/auth/refresh");
          setCredentials(data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          console.log("Session expired");
          clearCredentials();
          return Promise.reject(error);
        }
      }
    }
  },
);

export default axiosInstance;
