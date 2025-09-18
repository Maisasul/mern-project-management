import mongoose from "mongoose";
import Task from "../models/Task.js";
import Project from "../models/Project.js";

const validStatuses = ['To Do', 'In Progress', 'Done'];

export async function getAllTasksByProject(req, res) {
  try {
    const {projectId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({message: "Invalid project ID"});
    }

    const tasks = await Task.find({projectId}).sort({createdAt: -1});

    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks
    });

  } catch (error) {
    console.error("Error in getAllTasksByProject controller", error);

    res.status(500).json({message: 'Internal server error'});
  }
}

export async function getTaskById(req, res) {
  try {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: "Invalid Task ID"});
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);

  } catch (error) {
    console.error("Error in getTaskById controller", error);

    res.status(500).json({message: 'Internal server error'});
  }
}

export async function createTask(req,res) {
  try {
    const {projectId} = req.params;
    const {title, description, status} = req.body;

    if(!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({message: "Invalid project ID"});
    }

    const project = await Project.findById(projectId);
    if(!project) {
      return res.status(404).json({message: "Project not found"});
    }

    if(!title || title.trim() === "") {
      return res.status(400).json({message: "Task title is required"});
    }

    if(status && !validStatuses.includes(status)) {
      return res.status(400).json({message: "Invalid task status provided"});
    }

    const newTask = new Task({
      title: title.trim(),
      description: description?.trim() || "",
      status: status || "To Do",
      projectId
    });

    const savedTask = await newTask.save();

    res.status(201).json({
      message:"Task created successfully",
      task: savedTask 
    });

  } catch (error) {
    console.error("Error in createTask controller", error);

    res.status(500).json({message: 'Internal server error'});
  }
}

export async function updateTask(req, res) {
  try {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: "Invalid Task ID"});
    }

    const {title, description, status} = req.body;

    if (!title && !description && !status) {
      return res.status(400).json({message: "At least one field is required to update"});
    }

    if(status && !validStatuses.includes(status)) {
      return res.status(400).json({message: "Invalid task status provided"})
    }

    const updateData = {};
    if (title) updateData.title = title.trim();
    if (description) updateData.description = description.trim();
    if (status) updateData.status = status;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      updateData,
      {new: true, runValidators: true}
    );

    if (!updatedTask) {
      return res.status(404).json({message: "Task not found"});
    }

    res.status(200).json({
      message:"Task updated successfully",
      task: updatedTask 
    });

  } catch (error) {
    console.error("Error in updateTask controller", error);

    res.status(500).json({message: 'Internal server error'});
  }
}

export async function deleteTask(req, res) {
  try {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: "Invalid task ID"});
    }

    const removed = await Task.findByIdAndDelete(id);

    if(!removed) {
      return res.status(404).json({message: "Task not found"});
    }

    res.status(200).json({
      message: "Tasks deleted successfully"
    });

  } catch (error) {
    console.error("Error in deleteTask controller", error);

    res.status(500).json({message: 'Internal server error'});
  }
}