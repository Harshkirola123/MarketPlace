import { BaseSchema } from "../common/dto/base.dto";
import mongoose from "mongoose";

interface ITransaction extends BaseSchema {
  projectId: mongoose.Schema.Types.ObjectId;
  buyerId: mongoose.Schema.Types.ObjectId;
  amount: number;
  commission: number;
  transactionDate: Date;
  status: string; // e.g., 'successful', 'failed'
}

export default ITransaction;
