import { Router } from "express";
import { getBlog, getBlogs } from "../controllers/blogController";

const blogRoute = Router();

blogRoute.route("/").get(getBlogs);
blogRoute.route("/:id").get(getBlog);

export default blogRoute;
