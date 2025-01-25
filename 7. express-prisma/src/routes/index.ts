import { Router } from "express";
import userRoute from "./user.route";
import blogRoute from "./blog.route";

const apiRoute = Router();

apiRoute.use("/users", userRoute);
apiRoute.use("/blogs", blogRoute);

export default apiRoute;
