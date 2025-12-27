import express from 'express';
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import { errorMiddleware } from './middlewares/error.js';
import cors from 'cors';


export const app = express();
dotenv.config({ path: './.env' });






//<<<------------middlewares start ------------
app.use(express.json()); // 👈 req.body ke liye MUST
app.use(express.urlencoded({ extended: true })); // 👈 req.body ke liye MUST
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,   
}));
//------------middlewares end ------------>>> 






//<<<<------------routes start ------------
app.use('/api', userRoutes);
app.use('/api/course', courseRoutes);

//------------routes end ------------>>>>   

app.use(errorMiddleware);

