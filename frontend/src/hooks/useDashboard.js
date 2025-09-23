import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createProject, getAllProjects } from "../api/api";

export const useDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await getAllProjects();
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
      toast.error("Failed to fetch projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (formData) => {
    try {
      await createProject(formData);
      toast.success("Project created successfully!");
      setIsModalOpen(false); // Close modal on success
      fetchProjects();
    } catch (err) {
      console.error("Error creating project:", err);
      toast.error("Failed to create project. Please try again.");
      throw err;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    isModalOpen,
    setIsModalOpen,
    handleCreateProject,
  };
};