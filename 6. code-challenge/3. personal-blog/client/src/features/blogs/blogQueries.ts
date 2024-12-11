import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "./blogsApi";

export function useFetchBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: () => fetchBlogs(),
  });
}
