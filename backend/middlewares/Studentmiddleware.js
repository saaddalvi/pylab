import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const StudentMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.STUDENT_JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }

        req.id = decoded.id;
        next();
    });
};

export default StudentMiddleware;