import ErrorAlert from "@/components/ErrorAlert";
import Loading from "@/components/Loading";
import BlogDetails from "@/features/blogs/BlogDetails";
import { useFetchBlogs } from "@/features/blogs/blogQueries";
import { BlogType } from "@/types/blog";
import { useParams } from "react-router";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useFetchBlogs();
  const blog = data?.find((blog: BlogType) => blog.blogId === id);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorAlert error={error} />;
  }

  return <BlogDetails blog={blog} />;
};

export default BlogDetailsPage;
