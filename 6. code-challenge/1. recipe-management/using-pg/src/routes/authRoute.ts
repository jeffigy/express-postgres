import { Router } from "express";
import { getUsers, login, signup } from "../controllers/authController";
const authRoute = Router();

authRoute.route("/").get(getUsers);
authRoute.route("/signup").post(signup);
authRoute.route("/login").post(login);

export default authRoute;
