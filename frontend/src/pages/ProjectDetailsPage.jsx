import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { 
  getAllTasksByProject, 
  getProjectById,  
  deleteProject, 
  updateProject, 
  createTask,
  deleteTask,
  updateTask
} from '../api/api';
import TaskList from '../components/tasks/TaskList';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import TaskForm from '../components/tasks/TaskForm';
import { SquarePen, Trash } from 'lucide-react';
import ProjectForm from '../components/projects/ProjectForm';

const ProjectDetailsPage = () => {
  const {id} = useParams();

  const navigate =useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // load project && tasks
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // project handlers 
  const handleUpdateProject = async (formData) => {
    try {
      await updateProject(id, formData);
      setIsEditModalOpen(false);
      fetchData();
    } catch(err) {
      console.error('Error updating project:', err);
    }
  }

  const handleDeleteProject = async () => {
    if(window.confirm('Are you sure want to delete this project?This action cannot be undone.')) {
      try {
        await deleteProject(id);
        navigate('/');
      } catch (err) {
        console.error('Error deleting project:', err);
      }
    }
  }; 

  // task handlers 
  const handleCreateTask = async (formData) => {
    try {
      await createTask(id, formData);
      fetchData();
    } catch(err) {
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (formData) => {
    try {
      await updateTask(editingTask._id, formData);
      setEditingTask(null);
      fetchData(); // Re-fetch all data
    } catch (err) {
      console.error('Error updating task:', err);
      throw err;
    }
  };

  const handleDeleteTask = async (taskId) => {
    if(window.confirm('Are you sure want to delete this task?This action cannot be undone.')) {
      try {
      await deleteTask(taskId);
      fetchData();
      } catch(err) {
        console.error('Error creating task:', err);
      }
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

  if (loading) return <p>Loading...</p>;
  if (!project) return <p>Project not found!</p>;

  // Filter tasks
  const todoTasks = tasks.filter((t) => t.status.toLowerCase() === "to do".toLowerCase());
  const inProgressTasks = tasks.filter((t) => t.status.toLowerCase() === "in progress".toLowerCase());
  const doneTasks = tasks.filter((t) => t.status.toLowerCase() === "done".toLowerCase());

  return (
    <div className="p-6">
      <Navbar
        title={project.name}
        actions={[
          { 
            text: <SquarePen /> , 
            onClick: () => setIsEditModalOpen(true),
            className: 'bg-blue-600 text-white hover:bg-blue-700' 
          },
          { 
            text: <Trash />, 
            onClick: handleDeleteProject,
            className: 'bg-red-600 text-white hover:bg-red-700' 
          },
        ]}
      />
      <p className='text-gray-600 mb-6'>{project.description}</p>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaskList
          title="To Do"
          color="text-blue-600"
          tasks={todoTasks}
          onEdit={handleOpenTaskModal}
          onDelete={handleDeleteTask}
          onAdd={() => handleOpenTaskModal()}
        />
        <TaskList
          title="In Progress"
          color="text-yellow-600"
          tasks={inProgressTasks}
          onEdit={handleOpenTaskModal}
          onDelete={handleDeleteTask}
        />
        <TaskList
          title="Done"
          color="text-green-600"
          tasks={doneTasks}
          onEdit={handleOpenTaskModal}
          onDelete={handleDeleteTask}
        />
      </div>

      {/* Modal for Edit Project */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ProjectForm
          onSave={handleUpdateProject}
          onClose={() => setIsEditModalOpen(false)}
          initialData={project} 
        />
      </Modal>

      {/* Modal for task creation/editing */}
      <Modal isOpen={isTaskModalOpen} onClose={handleCloseTaskModal}>
        <TaskForm
          onSave={editingTask ? handleUpdateTask : handleCreateTask}
          onClose={handleCloseTaskModal}
          initialData={editingTask}
        />
      </Modal>
    </div>

  )
}

export default ProjectDetailsPage