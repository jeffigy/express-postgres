import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";

const authRoute = Router();

authRoute.route("/signup").post(signup);
authRoute.route("/login").post(login);

export default authRoute;
