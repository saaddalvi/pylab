import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const StudentMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    // Extract the token from the Bearer format
    const token = authHeader.startsWith('Bearer ') 
        ? authHeader.substring(7) 
        : authHeader;

    jwt.verify(token, process.env.STUDENT_JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }

        req.id = decoded.id;
        next();
    });
};

export default StudentMiddleware;