import express from "express";
import { spawn } from "child_process";

import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json()); // Ensure this middleware is used

app.post("/execute", (req, res) => {
  const { code } = req.body;
  const python = spawn("python3", ["-c", code]);

  let result = "";
  let error = "";

  python.stdout.on("data", (data) => {
    result += data.toString();
  });

  python.stderr.on("data", (data) => {
    error += data.toString();
  });

  python.on("close", (code) => {
    if (error) {
      res.json({ error });
    } else {
      res.json({ output: result });
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000);
