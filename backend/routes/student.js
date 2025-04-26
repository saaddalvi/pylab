import express from "express"
const router = express.Router();    
import prisma from '../db/prisma/script.js';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import StudentMiddleware from '../middlewares/Studentmiddleware.js';
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
            id:student.id
        });
    } catch (error) {
        res.status(500).json({ error:error.message});
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
            token
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get student's profile information
router.get('/profile', StudentMiddleware, async (req, res) => {
  const studentId = req.id; // Using the id set in StudentMiddleware

  try {
    // First, get the student information
    const student = await prisma.student.findUnique({
      where: {
        id: studentId
      },
      select: {
        id: true,
        name: true,
        email: true,
        rollNo: true,
        createdAt: true
      }
    });

    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }

    // Get the count of completed progress entries separately
    let completedProgressCount = 0;
    try {
      completedProgressCount = await prisma.userProgress.count({
        where: {
          studentId: studentId,
          completed: true
        }
      });
    } catch (countError) {
      console.error('Error counting completed progress:', countError);
      // Default to 0 if there's an error counting progress
    }

    // Format the response
    const profileData = {
      id: student.id,
      name: student.name,
      email: student.email,
      rollno: student.rollNo,
      lessonsCompleted: completedProgressCount || 0,
      joinedAt: student.createdAt,
    };

    res.json({ success: true, profile: profileData });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch profile data' });
  }
});

// Add progress tracking routes
router.post('/progress/track', StudentMiddleware, async (req, res) => {
  const { lessonId, completed, score } = req.body;
  const studentId = req.id; // Changed from req.studentId to req.id

  try {
    // Look for existing progress record
    const existingProgress = await prisma.userProgress.findUnique({
      where: {
        studentId_lessonId: {
          studentId,
          lessonId
        }
      }
    });

    let progress;
    
    // If record exists, update it
    if (existingProgress) {
      progress = await prisma.userProgress.update({
        where: {
          id: existingProgress.id
        },
        data: {
          completed,
          score,
          completedAt: completed ? new Date() : null
        }
      });
    } else {
      // Create new progress record
      progress = await prisma.userProgress.create({
        data: {
          studentId,
          lessonId,
          completed,
          score,
          completedAt: completed ? new Date() : null
        }
      });
    }

    res.json({ success: true, progress });
  } catch (error) {
    console.error('Error tracking progress:', error);
    res.status(500).json({ success: false, error: 'Failed to track lesson progress' });
  }
});

// Get student's progress for all lessons
router.get('/progress', StudentMiddleware, async (req, res) => {
  const studentId = req.id; // Changed from req.studentId to req.id

  try {
    const progress = await prisma.userProgress.findMany({
      where: {
        studentId
      },
      include: {
        lesson: true
      }
    });

    res.json({ success: true, progress });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch progress data' });
  }
});

// Get student progress for a specific lesson
router.get('/progress/:lessonId', StudentMiddleware, async (req, res) => {
  const studentId = req.id; // Changed from req.studentId to req.id
  const { lessonId } = req.params;

  try {
    const progress = await prisma.userProgress.findUnique({
      where: {
        studentId_lessonId: {
          studentId,
          lessonId
        }
      }
    });

    res.json({ success: true, progress });
  } catch (error) {
    console.error('Error fetching lesson progress:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch lesson progress data' });
  }
});

export default router;