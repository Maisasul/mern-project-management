import express from 'express';
import { createTask, deleteTask, getAllTasksByProject, getTaskById, updateTask } from '../controllers/tasksController.js';

const router = express.Router();

router.get('/project/:projectId', getAllTasksByProject);
router.get('/:id', getTaskById);
router.post('/project/:projectId', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;