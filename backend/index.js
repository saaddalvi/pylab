import express from "express";
import studentRouter from "./routes/student.js";
import adminRouter from "./routes/admin.js";
import lessonRouter from "./routes/lessons.js"
const app = express();
app.use(express.json());

app.use("/student", studentRouter);
app.use("/admin", adminRouter);
app.use("/lesson", lessonRouter);

app.listen(3000);
