import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
});

export const getAllProjects = () => api.get('/projects');
export const getProjectById = (projectId) => api.get(`/projects/${projectId}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (projectId, data) => api.put(`/projects/${projectId}`, data);
export const deleteProject = (projectId) => api.delete(`/projects/${projectId}`);

export const getAllTasksByProject = (projectId) => api.get(`/tasks/project/${projectId}`);