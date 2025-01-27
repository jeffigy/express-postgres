import { Router } from "express";
import authRoute from "./auth.routes";
import blogRoute from "./blog.routes";
import validateToken from "../middlewares/validate-token.middleware";

const apiRoute = Router();

apiRoute.use("/auth", authRoute);
apiRoute.use("/blogs", validateToken, blogRoute);

export default apiRoute;
