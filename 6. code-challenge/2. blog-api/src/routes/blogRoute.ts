import { Router } from "express";
import {
  deleteBlog,
  editBlog,
  fetchBlog,
  fetchBlogs,
  newBlog,
} from "../controllers/blogController";

const blogRoute = Router();

blogRoute.route("/").get(fetchBlogs).post(newBlog);
blogRoute.route("/:id").get(fetchBlog).patch(editBlog).delete(deleteBlog);

export default blogRoute;
