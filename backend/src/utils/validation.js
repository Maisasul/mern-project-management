import mongoose from "mongoose";

export const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const validStatuses = ["To Do", "In Progress", "Done"];