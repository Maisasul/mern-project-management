import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { getAllTasksByProject, getProjectById } from '../api/api';
import TaskList from '../components/tasks/TaskList';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import TaskForm from '../components/tasks/TaskForm';
import { SquarePen, Trash } from 'lucide-react';
import { deleteProject, updateProject } from '../api/api.js';
import ProjectForm from '../components/projects/ProjectForm';

const ProjectDetailsPage = () => {
  const {id} = useParams();

  const navigate =useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

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
          onEdit={(task) => console.log("edit", task)}
          onDelete={(id) => console.log("delete", id)}
          onAdd={() => setIsTaskModalOpen(true)}
        />
        <TaskList
          title="In Progress"
          color="text-yellow-600"
          tasks={inProgressTasks}
          onEdit={(task) => console.log("edit", task)}
          onDelete={(id) => console.log("delete", id)}
        />
        <TaskList
          title="Done"
          color="text-green-600"
          tasks={doneTasks}
          onEdit={(task) => console.log("edit", task)}
          onDelete={(id) => console.log("delete", id)}
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
    </div>

  )
}

export default ProjectDetailsPage