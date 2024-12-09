import { Router } from "express";
import {
  getUser,
  getUsers,
  login,
  logout,
  signup,
} from "../controllers/authController";

const authRoute = Router();

authRoute.route("/").get(getUsers);
authRoute.route("/:id").get(getUser);
authRoute.route("/login").post(login);
authRoute.route("/signup").post(signup);
authRoute.route("/logout").post(logout);

export default authRoute;
