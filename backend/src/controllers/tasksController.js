import mongoose from "mongoose";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import { isValidObjectId, validStatuses } from "../utils/validation.js";

// Get all tasks for a project
export async function getAllTasksByProject(req, res, next) {
  try {
    const { projectId } = req.params;

    if (!isValidObjectId(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const tasks = await Task.find({ projectId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks
    });

  } catch (error) {
    next(error);
  }
}

export async function getTaskById(req, res, next) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Taskfetched successfully", task });

  } catch (error) {
    next(error);
  }
}

export async function createTask(req, res, next) {
  try {
    const { projectId } = req.params;
    const { title, description, status } = req.body;

    if (!isValidObjectId(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!title?.trim()) {
      return res.status(400).json({ message: "Task title is required" });
    }

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid task status provided" });
    }

    const newTask = new Task({
      title: title.trim(),
      description: description?.trim() || "",
      status: status || "To Do",
      projectId
    });

    const savedTask = await newTask.save();

    res.status(201).json({
      message: "Task created successfully",
      task: savedTask
    });

  } catch (error) {
    next(error);
  }
}

export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }

    const updates = {};
    if (title?.trim()) updates.title = title.trim();
    if (description?.trim()) updates.description = description.trim();
    if (status) {
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid task status" });
      }
      updates.status = status;
    }

    if(Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {
    next(error);
  }
}

export async function deleteTask(req, res) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const removed = await Task.findByIdAndDelete(id);

    if (!removed) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Tasks deleted successfully",
      task: removed
    });

  } catch (error) {
    next(error);
  }
}