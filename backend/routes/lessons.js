import express from "express";
const router = express.Router();
import {z} from "zod";
import AdminMiddleware from "../middlewares/AdminMiddleware.js";
import prisma from "../db/prisma/script.js";  



const lessonSchema = z.object({
    title: z.string(),
    description: z.string(),
    content : z.string(),
})
router.post("/create",AdminMiddleware, async (req, res) => {
    const parsedData = lessonSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({error: parsedData.error.errors});
    }
    try {
        const lesson = await prisma.lessons.create({
            data: {
                title: parsedData.data.title,
                description: parsedData.data.description,
                content: parsedData.data.content
            }
        });
        res.status(201).json({
            message: "Lesson created successfully",
            id: lesson.id
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default router;