import { Router } from "express";
import {
  deleteBlog,
  getBlog,
  getBlogs,
  newBlog,
  // updateBlog,
} from "../controllers/blog.controller";

const blogRoute = Router();

blogRoute.route("/").get(getBlogs).post(newBlog);
blogRoute.route("/:id").get(getBlog).delete(deleteBlog);
// .patch(updateBlog).

export default blogRoute;
