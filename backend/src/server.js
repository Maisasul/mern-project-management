import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes.js';
import tasksRouter from './routes/tasksRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

//middlewera 
app.use(express.json());

app.use('/api/projects', projectRoutes);

app.use('/api/tasks', tasksRouter);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
