import express from "express";
const router = express.Router();
import { exec } from "child_process";
import { z } from "zod";


const codeSchema = z.object({
    code: z.string()
});

router.post("/", async (req, res) => {
    const parsedData = codeSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ error: parsedData.error.errors });
    }

    const { code } = parsedData.data;

    exec(`python3 -c "${code.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
        if (error) {
            return res.status(400).json({ error: stderr });
        }
        res.status(200).json({ output: stdout });
    });
});

export default router;