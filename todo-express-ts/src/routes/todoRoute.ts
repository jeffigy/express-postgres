import { Router } from "express";
import {
  deleteTodo,
  fetchTodo,
  fetchTodos,
  newTodo,
  updateTodo,
} from "../controllers/todoController";

const todoRoute = Router();

todoRoute.route("/").get(fetchTodos).post(newTodo);
todoRoute.route("/:id").get(fetchTodo).put(updateTodo).delete(deleteTodo);

export default todoRoute;
