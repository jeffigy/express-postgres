import axiosInstance from "@/store/axiosInstance";

export const fetchBlogs = async () => {
  return (await axiosInstance.get("/blogs")).data;
};
