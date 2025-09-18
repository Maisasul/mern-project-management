import mongoose from "mongoose";
import Project from "../models/Project.js";

export async function getAllProjects(req, res) {
  try {
    const projects = await Project.find().sort({ createdAt: -1});

    res.status(200).json({
      message: "Project fetched successfully",
      projects
    });

  } catch (error) {
    console.error("Error in getAllProjects controller", error);

    res.status(500).json({message: 'Internal server error'});
  }
}

export async function getProjectById(req, res) {
  try {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: "Invalid project ID format"});
    }

    const project = await Project.findById(id);

    if(!project) {
      return res.status(404).json({message: "Project not found"});
    }

    res.status(200).json({
      message: "Project fetched successfully",
      project
    });
    
  } catch (error) {
    console.error("Error in getProjectById controller", error);

    res.status(500).json({message: 'Internal server error'});
  }
}

export async function createProject(req, res) {
  try {
    const {name, description} = req.body;

    if(!name || name.trim() === "") {
      return res.status(400).json({ message: "Project name is required"});
    }
    
    const newProject = new Project({ 
      name: name.trim(), 
      description: description?.trim() || ""
    });

    const savedProject = await newProject.save();

    res.status(201).json({
      message:"Project created successfully",
      project: savedProject
    });

  } catch (error) {
    console.error("Error in createProject controller", error);

    res.status(500).json({message: 'Internal server error'});
  }
}

export async function updateProject(req, res) {
  try {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: "Invalid project ID format"});
    }

    const {name, description} = req.body;

    // if (!id) {
    //   return res.status(400).json({message: "Project ID is required"});
    // }

    if (!name && !description) {
      return res.status(400).json({message: "At least one field (name or description) is required"});
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {name, description},
      {new: true, runValidators: true}
    );

    if (!updatedProject) {
      return res.status(404).json({message: "Project not found"});
    }

    res.status(200).json({
      message:"Project updated successfully",
      project: updatedProject
    });

  } catch (error) {
    console.error("Error in updatedProject controller", error);

    res.status(500).json({message: 'Internal server error'});
  }
}

export async function deleteProject(req, res) {
  try {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: "Invalid project ID"});
    }

    const removed = await Project.findByIdAndDelete(id);

    if(!removed) {
      return res.status(404).json({message: "Project not found"});
    } 

    res.status(200).json({
      message: "Project deleted successfully",
      project: removed
    });

  } catch (error) {
    console.error("Error in deleteProject controller", error);

    res.status(500).json({message: 'Internal server error'});
  }
}