import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as transactionService from "./payment.service"; // Import the service

// Create a new transaction
/**
 * Creates a new transaction.
 *
 * @function createTransaction
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.projectId - The unique identifier of the project to be purchased.
 * @param {number} req.body.amount - The amount of the transaction.
 * @param {number} req.body.commission - The commission to be paid to the admin.
 * @param {"successful" | "failed"} req.body.status - The status of the transaction.
 * @returns {Promise<void>}
 * A promise resolving to a JSON response with a status code and a transaction object.
 */
export const createTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId, amount, commission, status } = req.body;
    const { id: buyerId } = req.params;
    console.log(projectId, amount, commission, status);
    const transaction = await transactionService.createTransaction(
      projectId,
      buyerId,
      amount,
      commission,
      status
    );
    res.status(201).json({
      success: true,
      data: transaction,
    });
  }
);

/**
 * Retrieves all transactions from the database.
 *
 * @function getAllTransactions
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 * A promise resolving to a JSON response with a status code and an array of transaction objects.
 */
export const getAllTransactions = asyncHandler(
  async (req: Request, res: Response) => {
    const transactions = await transactionService.getAllTransactions();
    res.status(200).json({
      success: true,
      data: transactions,
    });
  }
);

/**
 * Retrieves a transaction by its unique identifier.
 *
 * @function getTransactionById
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {string} req.params.id - The unique identifier of the transaction to be retrieved.
 * @returns {Promise<void>}
 * A promise resolving to a JSON response with a status code and a transaction object if found, or a 404 error if not found.
 */
export const getTransactionById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const transaction = await transactionService.getTransactionById(id);
    if (!transaction) {
      res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: transaction,
    });
  }
);

/**
 * Updates the status of a transaction.
 *
 * @function updateTransactionStatus
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {string} req.params.id - The unique identifier of the transaction to be updated.
 * @param {"successful" | "failed"} req.body.status - The new status of the transaction.
 * @returns {Promise<void>}
 * A promise resolving to a JSON response with a status code and a transaction object if found, or a 404 error if not found.
 */
export const updateTransactionStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["successful", "failed"].includes(status)) {
    res.status(400).json({
      success: false,
      message: "Invalid status",
    });
    return;
  }

  const updatedTransaction = await transactionService.updateTransactionStatus(
    id,
    status
  );
  if (!updatedTransaction) {
    res.status(404).json({
      success: false,
      message: "Transaction not found",
    });
    return;
  }
  res.status(200).json({
    success: true,
    data: updatedTransaction,
  });
});

/**
 * Deletes a transaction from the database.
 *
 * @function deleteTransaction
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {string} req.params.id - The unique identifier of the transaction to be deleted.
 * @returns {Promise<void>}
 * A promise resolving to a JSON response with a status code and a success message.
 */
export const deleteTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await transactionService.deleteTransaction(id);
    res.status(204).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  }
);
