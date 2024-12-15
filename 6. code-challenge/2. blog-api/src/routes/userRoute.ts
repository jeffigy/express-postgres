import { Router } from "express";
import { fetchUsers, newUser } from "../controllers/userController";

const userRoute = Router();

userRoute.route("/").get(fetchUsers).post(newUser);
export default userRoute;
