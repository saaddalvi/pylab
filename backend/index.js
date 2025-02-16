import express from "express";
import studentRouter from "./routes/student.js";
import adminRouter from "./routes/admin.js";
import lessonRouter from "./routes/lessons.js"
import executeRouter from "./routes/execute.js";

const app = express();
app.use(express.json());

app.use("/student", studentRouter);
app.use("/admin", adminRouter);
app.use("/lesson", lessonRouter);
app.use("/execute", executeRouter);

app.listen(3000);
