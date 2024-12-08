import { Router } from "express";
import {
  deleteBlog,
  editBlog,
  getUsersBlog,
  getUsersBlogs,
  newBlog,
} from "../controllers/blogController";
import validateToken from "../middlewares/validateToken";

const userRoute = Router();

userRoute.use(validateToken); // verifies the jwt token from req.headers.authorization

userRoute.route("/blogs").get(getUsersBlogs).post(newBlog);
userRoute
  .route("/blogs/:id")
  .get(getUsersBlog)
  .patch(editBlog)
  .delete(deleteBlog);

export default userRoute;
