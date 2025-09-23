import mongoose from "mongoose";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import { isValidObjectId } from "../utils/validation.js";


export async function getAllProjects(req, res, next) {
  try {
    const projects = await Project.find().sort({ createdAt: -1});

    const projectsWithSummary = await Promise.all(
      projects.map(async (project) => {
        const tasks = await Task.find({ projectId: project._id });

        return {
          ...project.toObject(),
          summary: {
            todo: tasks.filter((t) => t.status === "To Do").length,
            inProgress: tasks.filter((t) => t.status === "In Progress").length,
            done: tasks.filter((t) => t.status === "Done").length,
          },
        };
      })
    );

    res.status(200).json({
      message: "Project fetched successfully",
      projects: projectsWithSummary
    });

  } catch (error) {
    next(error); 
  }
}

export async function getProjectById(req, res, next) {
  try {
    const {id} = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({message: "Invalid project ID"});
    }

    const project = await Project.findById(id);
    if(!project) {
      return res.status(404).json({message: "Project not found"});
    }

    const tasks = await Task.find({ projectId: id });

    res.status(200).json({
      message: "Project fetched successfully",
      project: project.toObject(),
      tasks: {
        todo: tasks.filter((t) => t.status === "To Do"),
        inProgress: tasks.filter((t) => t.status === "In Progress"),
        done: tasks.filter((t) => t.status === "Done"),
      },
    });
    
  } catch (error) {
    next(error);
  }
}

export async function createProject(req, res, next) {
  try {
    const {name, description} = req.body;

    if(!name?.trim()) {
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
    next(error); 
  }
}

export async function updateProject(req, res, next) {
  try {
    const {id} = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({message: "Invalid project ID"});
    }

    const updates = {};
    if (req.body.name) updates.name = req.body.name.trim();
    if (req.body.description) updates.description = req.body.description.trim();

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updatedProject = await Project.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({message: "Project not found"});
    }

    res.status(200).json({
      message:"Project updated successfully",
      project: updatedProject
    });

  } catch (error) {
    next(error); 
  }
}

export async function deleteProject(req, res, next) {
  try {
    const {id} = req.params;

    if (!isValidObjectId(id)) {
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
    next(error); 
  }
}