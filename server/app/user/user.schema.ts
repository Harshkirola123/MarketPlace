import mongoose from "mongoose";
import { userEnum, type IUser } from "./user.dto";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refToken: {
      type: String,
      default: undefined,
    },
    role: {
      type: String,
      enum: [...userEnum],
      default: "USER",
    },
    walletBalance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
