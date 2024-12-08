import { Router } from "express";
import {
  deleteBlog,
  editBlog,
  getBlog,
  getBlogs,
  getUsersBlog,
  getUsersBlogs,
  newBlog,
} from "../controllers/blogController";
import validateToken from "../middlewares/validateToken";

const blogRoute = Router();

blogRoute.route("/").get(getBlogs);
blogRoute.route("/:id").get(getBlog);

blogRoute.use(validateToken); // verifies the jwt token from req.headers.authorization

blogRoute.route("/my").get(getUsersBlogs).post(newBlog);
blogRoute.route("/my/:id").get(getUsersBlog).patch(editBlog).delete(deleteBlog);

export default blogRoute;
