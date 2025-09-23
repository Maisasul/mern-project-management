import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  getAllTasksByProject,
  getProjectById,
  deleteProject,
  updateProject,
  createTask,
  deleteTask,
  updateTask
} from '../api/api';

export const useProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [isConfirmProjectDeleteOpen, setIsConfirmProjectDeleteOpen] = useState(false);
  const [isConfirmTaskDeleteOpen, setIsConfirmTaskDeleteOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

  const fetchData = async () => {
    try {
      const [projectRes, tasksRes] = await Promise.all([
        getProjectById(id),
        getAllTasksByProject(id),
      ]);
      setProject(projectRes.data.project);
      setTasks(tasksRes.data.tasks || []);
    } catch (err) {
      console.error("Error fetching project details:", err);
      toast.error("Failed to fetch details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Project Handlers
  const handleUpdateProject = async (formData) => {
    try {
      await updateProject(id, formData);
      toast.success('Project updated successfully!');
      setIsEditModalOpen(false);
      fetchData();
    } catch (err) {
      console.error('Error updating project:', err);
      toast.error("Failed to update project. Please try again.");
    }
  };

  const handleDeleteProject = () => setIsConfirmProjectDeleteOpen(true);

  const confirmDeleteProject = async () => {
    try {
      await deleteProject(id);
      setIsConfirmProjectDeleteOpen(false);
      toast.success('Project deleted successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error deleting project:', err);
      toast.error('Failed to delete project. Please try again.');
    }
  };

  // Task Handlers
  const handleCreateTask = async (formData) => {
    try {
      await createTask(id, formData);
      toast.success('Task created successfully!');
      fetchData();
    } catch (err) {
      console.error('Error creating task:', err);
      toast.error("Failed to create task. Please try again.");
    }
  };

  const handleUpdateTask = async (formData) => {
    try {
      await updateTask(editingTask._id, formData);
      toast.success('Task updated successfully!');
      setEditingTask(null);
      fetchData();
    } catch (err) {
      console.error('Error updating task:', err);
      toast.error("Failed to update task. Please try again.");
    }
  };

  const handleDeleteTask = (taskId) => {
    setTaskIdToDelete(taskId);
    setIsConfirmTaskDeleteOpen(true);
  };

  const confirmDeleteTask = async () => {
    if (!taskIdToDelete) return;
    try {
      await deleteTask(taskIdToDelete);
      setIsConfirmTaskDeleteOpen(false);
      setTaskIdToDelete(null);
      fetchData();
      toast.success('Task deleted successfully!');
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error('Failed to delete task. Please try again.');
    }
  };

  const handleOpenTaskModal = (task = null) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setEditingTask(null);
    setIsTaskModalOpen(false);
  };

  return {
    loading,
    project,
    tasks,
    todoTasks: tasks.filter((t) => t.status.toLowerCase() === "to do".toLowerCase()),
    inProgressTasks: tasks.filter((t) => t.status.toLowerCase() === "in progress".toLowerCase()),
    doneTasks: tasks.filter((t) => t.status.toLowerCase() === "done".toLowerCase()),
    isEditModalOpen,
    setIsEditModalOpen,
    isTaskModalOpen,
    handleCloseTaskModal,
    editingTask,
    handleUpdateProject,
    handleDeleteProject,
    confirmDeleteProject,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    confirmDeleteTask,
    handleOpenTaskModal,
    isConfirmProjectDeleteOpen,
    setIsConfirmProjectDeleteOpen,
    isConfirmTaskDeleteOpen,
    setIsConfirmTaskDeleteOpen
  };
};