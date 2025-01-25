import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  newUser,
  updateUser,
} from "../controllers/user.controller";

const userRoute = Router();

userRoute.route("/").get(getUsers).post(newUser);
userRoute.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default userRoute;
