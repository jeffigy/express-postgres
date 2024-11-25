import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.use("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

export default app;
