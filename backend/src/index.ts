import express from "express";
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json()); // Ensure this middleware is used

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000);
