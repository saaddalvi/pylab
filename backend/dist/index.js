"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const child_process_1 = require("child_process");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // Ensure this middleware is used
app.post("/execute", (req, res) => {
    const { code } = req.body;
    const python = (0, child_process_1.spawn)("python3", ["-c", code]);
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
        }
        else {
            res.json({ output: result });
        }
    });
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(3000);
