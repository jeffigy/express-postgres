import { Router } from "express";
import {
  deleteTodo,
  editTodo,
  getAllTodos,
  getTodo,
  newTodo,
} from "../controllers/todoController.mjs";
const todoRoute = Router();

todoRoute.route("/").get(getAllTodos).post(newTodo);
todoRoute.route("/:id?").get(getTodo).patch(editTodo).delete(deleteTodo);

export default todoRoute;
