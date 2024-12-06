import { Router } from "express";
import {
  deleteBlog,
  editBlog,
  getBlog,
  getBlogs,
  newBlog,
} from "../controllers/blogController";

const blogRoute = Router();

blogRoute.route("/").get(getBlogs).post(newBlog);
blogRoute.route("/:id").get(getBlog).patch(editBlog).delete(deleteBlog);

export default blogRoute;
