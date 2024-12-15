import { Router } from "express";
import { login, logout, refresh, signup } from "../controllers/authController";

const authRoute = Router();

authRoute.route("/login").post(login);
authRoute.route("/signup").post(signup);
authRoute.route("/logout").post(logout);
authRoute.route("/refresh").get(refresh);

export default authRoute;
