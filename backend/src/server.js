import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';
import tasksRoutes from './routes/tasksRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

//middlewera 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running..');
});

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', tasksRoutes);

app.use((req, res) => {
  res.status(404).json({message: 'Route not found'});
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
