import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.get('/api/notes', (req, res) => {
  res.send("message");
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
