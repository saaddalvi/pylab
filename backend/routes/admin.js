import express from "express";
const router = express.Router();
import prisma from '../db/prisma/script.js';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const signupSchema = z.object({
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

        const admin = await prisma.admin.create({
            data: {
                email: parsedData.data.email,
                password: hashedPassword
            }
        });

        res.status(201).json({
            message: "Admin created successfully",
            id: admin.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
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
        const admin = await prisma.admin.findUnique({
            where: { email: parsedData.data.email }
        });

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const isPasswordValid = await bcrypt.compare(parsedData.data.password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: admin.id }, process.env.ADMIN_JWT_SECRET);

        res.status(200).json({
            message: 'Admin signed in successfully',
            token
        });
    } catch (error) {
        res.status(500).json({ error:error.message});
    }
});

export default router;