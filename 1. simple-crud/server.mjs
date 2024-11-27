import express from "express";
import pool from "./db.mjs";
const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/todos", async (req, res) => {
  try {
    const { rows: allTodos } = await pool.query("SELECT * FROM todo");

    if (allTodos.length === 0) {
      return res.status(404).json({ message: "No todos found" });
    }

    res.status(200).json(allTodos);
  } catch (error) {
    console.log(error);
  }
});

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows: todo } = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1",
      [id]
    );

    if (todo.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.status(201).json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.put("/todos/:id", async (req, res) => {
  const { description } = req.body;
  const { id } = req.params;

  try {
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json({ message: "Todo successfully updated" });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json({ message: "todo deleted" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`app is running @ port ${PORT}`);
});
