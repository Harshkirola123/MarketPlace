import mongoose, { Schema } from "mongoose";
import ITransaction from "./payment.dto";

const transactionSchema = new Schema<ITransaction>(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    commission: { type: Number, required: true },
    transactionDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["successful", "failed"],
      default: "successful",
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);

export default Transaction;
