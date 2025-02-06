import mongoose from "mongoose";
import { BaseSchema } from "../common/dto/base.dto";

interface IProject extends BaseSchema {
  title: string;
  description: string;
  screenshots: string[]; // Array of URLs or file paths for screenshots
  sourceCode: string; // Path to the zip file
  owner: mongoose.Schema.Types.ObjectId; // Reference to the User who uploaded the project
  price: number;
  shortDescription: string;
  purchaseCount: number; // Tracks how many times the project has been purchased
}

export default IProject;
