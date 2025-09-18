import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    status: { 
      type: String, 
      enum: ['To Do', 'In Progress', 'Done'], 
      default: 'To Do'
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      require: true
    }
  },
  {timestamps: true}
);

const Task = mongoose.model('Task', taskSchema);

export default Task;