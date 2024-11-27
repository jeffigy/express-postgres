import { Router } from "express";
import { fetchUsers, getUser, newUser } from "../controllers/usersController";

const userRoutes = Router();

userRoutes.route("/").get(fetchUsers).post(newUser);
userRoutes.route("/:id").get(getUser);

export default userRoutes;
