import Blog from "./Blog";
import { useFetchBlogs } from "./blogQueries";
import { BlogType } from "@/types/blog";

const BlogsList = () => {
  const { data: blogs, isError, isLoading, error } = useFetchBlogs();
  if (isLoading) return <p>loading...</p>;
  if (isError) return <p>{error.message}</p>;

  console.log(blogs);

  return (
    <div className="flex flex-col">
      {blogs &&
        blogs.map((blog: BlogType) => <Blog key={blog.blogId} blog={blog} />)}
    </div>
  );
};

export default BlogsList;
