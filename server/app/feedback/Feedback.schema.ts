import mongoose, { Schema } from "mongoose";
import IFeedback from "./Feedback.dto";

const feedbackSchema = new Schema<IFeedback>(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    feedback: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model<IFeedback>("Feedback", feedbackSchema);

export default Feedback;
