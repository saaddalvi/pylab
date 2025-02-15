import express from "express"
const router = express.Router();    
import prisma from '../db/prisma/script.js';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const signupSchema = z.object({
    name: z.string(),
    rollno: z.number(),
    email: z.string().email(),
    password: z.string().min(6)
});

router.post('/signup', async (req, res) => {
    const parsedData = signupSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({ error: parsedData.error.errors });
    }
    try {
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

        const student = await prisma.student.create({
            data: {
                name: parsedData.data.name,
                rollNo: parsedData.data.rollno,
                email: parsedData.data.email,
                password: hashedPassword
            }
        });

        res.status(201).json({
            message:"Student created successfully",
            student
        });
    } catch (error) {
        res.status(500).json({ error});
    }
});

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

router.post('/signin', async (req, res) => {
    const parsedData = signinSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({ error: parsedData.error.errors });
    }

    try {
        const student = await prisma.student.findUnique({
            where: { email: parsedData.data.email }
        });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const isPasswordValid = await bcrypt.compare(parsedData.data.password, student.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: student.id }, process.env.STUDENT_JWT_SECRET);

        res.status(200).json({
            message: 'Student signed in successfully',
            student,
            token
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

export default router;