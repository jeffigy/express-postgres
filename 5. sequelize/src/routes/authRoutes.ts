import { Router } from "express";
import { login } from "../controllers/authController";

const authRoutes = Router();

authRoutes.route("/login").post(login);

export default authRoutes;
