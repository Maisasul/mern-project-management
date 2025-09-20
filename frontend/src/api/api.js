import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
});

// project CRUD function 
export const getAllProjects = () => api.get('/projects');
export const getProjectById = (projectId) => api.get(`/projects/${projectId}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (projectId, data) => api.put(`/projects/${projectId}`, data);
export const deleteProject = (projectId) => api.delete(`/projects/${projectId}`);

// task CRUD function 
export const getAllTasksByProject = (projectId) => api.get(`/tasks/project/${projectId}`);
export const createTask = (projectId, taskData) => api.post(`/tasks/project/${projectId}/tasks`, taskData);
export const getTaskById = (taskId) => 
  api.get(`/tasks/${taskId}`);
export const updateTask = (taskId, taskData) => api.put(`/tasks/${taskId}`, taskData);
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);