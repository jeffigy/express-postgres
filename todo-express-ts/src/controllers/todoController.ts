import { Request, Response } from "express";
import { query } from "../utils/db";

export const fetchTodos = async (_req: Request, res: Response) => {
  const todos = await query("SELECT * FROM todos");

  if (todos.length === 0) {
    res.status(404).json({ message: "No todos found" });
    return;
  }

  res.json(todos);
};

export const fetchTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  const todo = await query("SELECT * FROM todos WHERE id = $1", [id]);

  if (todo.length === 0) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }

  res.json(todo);
};

export const newTodo = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (!title) {
    res.status(400).json({ message: "title is required" });
    return;
  }

  const newTodo = await query(
    "INSERT INTO todos (title, description, is_complete) VALUES ($1, $2, $3) RETURNING *",
    [title, description, false]
  );

  res.json(newTodo);
};
export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;

  if (!id || !title || typeof isComplete !== "boolean") {
    res.status(400).json({ message: "Some fields are missing" });
    return;
  }

  const foundTodo = await query(
    `SELECT EXISTS (
      SELECT 1 FROM todos WHERE id = $1
    )`,
    [id]
  );

  if (!foundTodo[0].exists) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }

  const updatedTodo = await query(
    "UPDATE todos SET title = $1, description = $2, is_complete = $3 WHERE id = $4 RETURNING *",
    [title, description, isComplete, id]
  );
  res.json(updatedTodo);
};
export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "id is required" });
  }

  const foundTodo = await query(
    `SELECT EXISTS (
      SELECT 1 FROM todos WHERE id = $1
    )`,
    [id]
  );

  if (!foundTodo[0].exists) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }

  const deleteTodo = await query(
    "DELETE FROM todos WHERE id = $1 RETURNING title",
    [id]
  );

  res.json({
    message: `todo with title ${deleteTodo[0].title} successfully deleted`,
  });
};
