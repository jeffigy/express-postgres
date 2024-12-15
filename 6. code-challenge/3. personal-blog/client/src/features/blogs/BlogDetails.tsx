import useFormattedDate from "@/hooks/useFormattedDate";
import { BlogType } from "@/types/blog";

const BlogDetails = ({ blog }: { blog: BlogType }) => {
  const date = useFormattedDate(blog.createdAt);
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <p>{date}</p>
    </div>
  );
};

export default BlogDetails;
