import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
});

// project api - endpoints 
export const getAllProjects = () => api.get('/projects');
export const getProjectById = (projectId) => api.get(`/projects/${projectId}`);
export const createProject = (data) => api.post('/projects', data);

// export const getProjectById = () => api.get(`/projects/${id}`);
// export const createProject = (projectData) => api.post('/projectData');