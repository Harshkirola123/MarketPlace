import mongoose from "mongoose";
import { BaseSchema } from "../common/dto/base.dto";

interface IFeedback extends BaseSchema {
  projectId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  rating: number; // Rating from 1 to 5
  feedback: string; // Text feedback from the user
}
export default IFeedback;
