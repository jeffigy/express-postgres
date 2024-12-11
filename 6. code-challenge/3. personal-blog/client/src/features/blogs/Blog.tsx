import { Card } from "@/components/ui/card";
import { BlogType } from "@/types/blog";
import { NavLink } from "react-router";

const Blog = ({ blog }: { blog: BlogType }) => {
  return (
    <NavLink to={`blog/${blog.blogId}`}>
      <Card className="mx-auto mb-5 max-w-screen-md rounded-lg p-4">
        <p>{blog.title}</p>
        <p>{blog.content}</p>
      </Card>
    </NavLink>
  );
};

export default Blog;
