import mongoose, { Schema } from "mongoose";
import IProject from "./project.dto";

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    screenshots: [{ type: String, default: [] }],
    sourceCode: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: { type: Number },
    shortDescription: { type: String, required: true },
    purchaseCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;
