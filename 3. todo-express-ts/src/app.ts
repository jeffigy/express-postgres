import "express-async-errors";

import express, { Request, Response } from "express";
import todoRoute from "./routes/todoRoute";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, typescript with express");
});

app.use("/todos", todoRoute);

export default app;
