import express from 'express';
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../controllers/projectsController.js';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.put('/:id', updateProject);  
router.delete('/:id', deleteProject);  


export default router;