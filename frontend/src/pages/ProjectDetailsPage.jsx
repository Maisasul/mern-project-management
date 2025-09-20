import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getProjectById } from '../api/api';

const ProjectDetailsPage = () => {
  const {id} = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await getProjectById(id);
        setProject(res.data);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);
  
  if (loading) {
    return <p>Loading project details...</p>;
  }
  if (!project) {
    return <p>Project not found!</p>;
  }
  return (
    <div>
      <h1>Project: {project.name}</h1>
      <p>Description: {project.description}</p>
    </div>
  )
}

export default ProjectDetailsPage