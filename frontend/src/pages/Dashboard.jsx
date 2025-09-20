import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { createProject, getAllProjects } from '../api/api';
import Navbar from '../components/Navbar';
import ProjectList from '../components/projects/ProjectList';
import Modal from '../components/Modal';
import ProjectForm from '../components/projects/ProjectForm';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await getAllProjects();
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (formData) => {
    try {
      await createProject(formData);
      fetchProjects(); // Re-fetch all projects after creating a new one
    } catch (err) {
      console.error('Error creating project:', err);
      throw err; // re-throw to be caught by the form
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <p>Loading...</p>

  return (
    <div className='flex-1 flex flex-col overflow-hidden'>
      {/* header */}
      <Navbar 
        title='Dashboard'
        actions={[
          {
            text: 'Add Project',
            onClick: () => setIsModalOpen(true),
            className: 'bg-blue-600 text-white hover:bg-blue-700',
            icon: <Plus />
          }
        ]}
      />
      <div className='flex-1 overflow-y-auto bg-transparent'>
        <div className='p-6 space-y-6'>
          {projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            <ProjectList projects={projects}/>
          )}
        </div>
      </div>
       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProjectForm
          onSave={handleCreateProject}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default Dashboard