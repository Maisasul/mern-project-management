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
import { Clipboard, Flag, FolderKanban, LayoutGrid, Plus, SquarePen, Trash } from 'lucide-react';
import ProjectForm from '../components/projects/ProjectForm';
import toast from 'react-hot-toast';
import ConfirmationDialog from '../components/ConfirmationDialog';
import EmptyState from '../components/EmptyState';
import emptyTaskImg from '../assets/images/emptyTask.svg';

const ProjectDetailsPage = () => {
  const {id} = useParams();

  const navigate =useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [isConfirmProjectDeleteOpen, setIsConfirmProjectDeleteOpen] = useState(false);
  const [isConfirmTaskDeleteOpen, setIsConfirmTaskDeleteOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

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
      toast.error("Failed to fetch  details. Please try again.");
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
      toast.success('Project updated successfully!');
      setIsEditModalOpen(false);
      fetchData();
    } catch(err) {
      console.error('Error updating project:', err);
      toast.error("Failed to update project. Please try again.");
    }
  }

  // const handleDeleteProject = async () => {
  //   if(window.confirm('Are you sure want to delete this project?This action cannot be undone.')) {
  //     try {
  //       await deleteProject(id);
  //       navigate('/');
  //     } catch (err) {
  //       console.error('Error deleting project:', err);
  //     }
  //   }
  // }; 
  const handleDeleteProject = () => {
    setIsConfirmProjectDeleteOpen(true);
  };

  const confirmDeleteProject = async () => {
    try {
      await deleteProject(id);
      setIsConfirmProjectDeleteOpen(false);
      toast.success('Project delted successfully!');
      navigate('/');
    } catch(err) {
      console.error('Error deleting project:', err);
      toast.error('Failed to delete project. Please try again.');
    }
  };

  // task handlers 
  const handleCreateTask = async (formData) => {
    try {
      await createTask(id, formData);
      toast.success('Task created successfully!');
      fetchData();
    } catch(err) {
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
      throw err;
    }
  };

  const handleDeleteTask = async (taskId) => {
    setTaskIdToDelete(taskId);
    setIsConfirmTaskDeleteOpen(true);
  };

  const confirmDeleteTask = async () => {
    if(!taskIdToDelete) return;
    try {
      await deleteTask(taskIdToDelete);
      setIsConfirmTaskDeleteOpen(false);
      setTaskIdToDelete(null);
      fetchData();
      toast.success('Task deleted successfully!');
    } catch(err) {
      console.error('Error deleting task:', err);
      toast.error('Failed to delete task. Please try again.');
    }
  }

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
    <div>
      <Navbar
        title={project.name}
        icon={<Clipboard size={25} className='text-white' />}
        iconBgColor='bg-indigo-600'
        actions={[
          { 
            text: 'Edit', 
            icon: <SquarePen size={18}/>,
            onClick: () => setIsEditModalOpen(true),
            className: 'text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white' 
          },
          { 
            text: 'Delete', 
            icon: <Trash size={18}/>, 
            onClick: handleDeleteProject,
            className: 'text-red-600 border border-red-600 hover:bg-red-600 hover:text-white' 
          },
        ]}
      />
      <p className='text-gray-600 mb-6'>{project.description}</p>

      {tasks.length === 0 ? (
        <EmptyState 
          image={emptyTaskImg}
          title="No tasks yet"
          message="Start by creating your first task!"
          action={
            <button
              onClick={() => handleOpenTaskModal()}
              className='flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors'
            >
              <Plus size={18}/> Add Task
            </button>
          }
        />
      ) : (
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
      )}

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

      {/* Confirmation Modal for Project Delete */}
      <Modal isOpen={isConfirmProjectDeleteOpen} onClose={() => setIsConfirmProjectDeleteOpen(false)}>
        <ConfirmationDialog 
          message="Are you sure you want to delete this project? This action cannot be undone."
          onConfirm={confirmDeleteProject}
          onCancel={() => setIsConfirmProjectDeleteOpen(false)}
          confirmText="Delete Project"
        />
      </Modal>

      {/* Confirmation Modal for Task Delete */}
      <Modal isOpen={isConfirmTaskDeleteOpen} onClose={() => setIsConfirmTaskDeleteOpen(false)}>
        <ConfirmationDialog 
          message="Are you sure you want to delete this task? This action cannot be undone."
          onConfirm={confirmDeleteTask}
          onCancel={() => setIsConfirmTaskDeleteOpen(false)}
          confirmText="Delete Task"
        />
      </Modal>
    </div>
  )
}

export default ProjectDetailsPage