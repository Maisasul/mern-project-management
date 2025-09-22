import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type:String,
      required: true,
      trim: true,
      maxlength: 100
    },
    description: {
      type: String,
      default: '',
      trim: true,
      maxlength: 500
    },
  },
  {timestamps: true}
);
  
const Project = mongoose.model('Project', projectSchema);

export default Project;