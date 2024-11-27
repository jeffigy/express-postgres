import pool from "../utils/db.mjs";

const getAllTodos = async (req, res) => {
  try {
    const { rows: todos } = await pool.query("SELECT * FROM todo");

    if (todos.length === 0) {
      return res.status(404).json({ message: "No todos found" });
    }

    res.json(todos);
  } catch (error) {
    console.log("get todos error", error);
  }
};

const getTodo = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const { rows: todo } = await pool.query(
      "Select * FROM todo WHERE todo_id = $1",
      [id]
    );

    if (todo.length === 0) {
      return res.status(404).json({ message: "todo not found" });
    }

    res.json(todo);
  } catch (error) {
    console.log("get todo error", error);
  }
};

const newTodo = async (req, res) => {
  console.log(req.body);

  const { description } = req.body;
  try {
    if (!description) {
      return res.status(400).json({ message: "description is required" });
    }

    const newTodo = await pool.query(
      "INSERT INTO todo (DESCRIPTION) VALUES ($1) RETURNING *",
      [description]
    );

    res.status(201).json({
      message: `Entry ${newTodo.rows[0].description} successfully added`,
    });
  } catch (error) {
    console.log("new todo error", error);
  }
};

const editTodo = async (req, res) => {
  const { description } = req.body;
  const { id } = req.params;

  try {
    if (!id || !description) {
      return res
        .status(400)
        .json({ message: "id and description are required" });
    }

    const { rowCount } = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "todo not found" });
    }

    res.status(200).json({ message: "todo successfully updated" });
  } catch (error) {
    console.log("edit todo error", error);
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const { rowCount } = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "todo not found" });
    }

    res.status(200).json({ message: "todo deleted" });
  } catch (error) {
    console.log("delete todo error", error);
  }
};

export { deleteTodo, editTodo, getAllTodos, newTodo, getTodo };
