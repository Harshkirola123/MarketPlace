import { Router } from "express";
import * as transactionController from "./payment.control"; // Import the controller
import { roleAuthMiddleware } from "../common/middleware/role-auth.middleware";
import { userEnum } from "../user/user.dto";

const router = Router();

// POST /transactions - Create a new transaction
router.post(
  "/",
  roleAuthMiddleware([...userEnum]),
  transactionController.createTransaction
);

// GET /transactions - Get all transactions
router.get(
  "/",
  roleAuthMiddleware([...userEnum]),
  transactionController.getAllTransactions
);

// GET /transactions/:id - Get a transaction by ID
router.get(
  "/:id",
  roleAuthMiddleware([...userEnum]),
  transactionController.getTransactionById
);

// PATCH /transactions/:id - Update transaction status
router.patch(
  "/:id",
  roleAuthMiddleware([...userEnum]),
  transactionController.updateTransactionStatus
);

// DELETE /transactions/:id - Delete a transaction
router.delete(
  "/:id",
  roleAuthMiddleware([...userEnum]),
  transactionController.deleteTransaction
);

export default router;
