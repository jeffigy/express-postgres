import express from "express";
import cors from "cors";
import todoRoute from "./routes/todoRoute.mjs";
import corsOptions from "./utils/corsOptions.mjs";

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use("/todos", todoRoute);

export default app;
