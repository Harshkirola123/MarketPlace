import Transaction from "./payment.schema";
import ITransaction from "./payment.dto";

import User from "../user/user.schema";
import Project from "../project/project.schema";

/**
 * Creates a new transaction, given the project and buyer IDs, the amount to be transferred, the commission and the status of the transaction.
 * @param projectId - The id of the project to be purchased.
 * @param buyerId - The id of the buyer.
 * @param amount - The amount to be transferred.
 * @param commission - The commission to be paid to the admin.
 * @param status - The status of the transaction. Defaults to "successful".
 * @returns The newly created transaction document.
 * @throws {Error} If the project or buyer is not found.
 * @throws {Error} If the buyer does not have enough funds.
 */
export const createTransaction = async (
  projectId: string,
  buyerId: string,
  amount: number,
  commission: number,
  status: "successful" | "failed" = "successful"
): Promise<ITransaction> => {
  // Step 1: Create the transaction
  const project = await Project.findById(projectId);
  if (!project) {
    throw new Error("Project not found");
  }

  const buyer = await User.findById(buyerId);
  if (!buyer) {
    throw new Error("Buyer not found");
  }

  if (buyer.walletBalance < amount) {
    throw new Error("Buyer does not have enough funds");
  }
  buyer.walletBalance -= amount;
  await buyer.save();
  const newTransaction = new Transaction({
    projectId,
    buyerId,
    amount,
    commission,
    status,
  });

  const transaction = await newTransaction.save();

  if (status === "successful") {
    const adminId = "67a4bd77088f86c4d6cb5040";

    const admin = await User.findById(adminId);
    if (!admin) {
      throw new Error("Admin not found");
    }

    admin.walletBalance += commission;
    await admin.save();

    const owner = await User.findById(project.owner);
    if (!owner) {
      throw new Error("Admin not found");
    }
    owner.walletBalance += amount - commission;
    await owner.save();

    project.purchaseCount += 1;
    await project.save();
  }

  return transaction;
};

/**
 * Retrieves all transactions from the database.
 *
 * @returns {Promise<ITransaction[]>}
 * A promise resolving to an array of transaction objects, each populated with its associated project and buyer information.
 */

export const getAllTransactions = async (): Promise<ITransaction[]> => {
  return await Transaction.find().populate("projectId buyerId ");
};

/**
 * Finds a transaction by its unique identifier.
 *
 * @param {string} transactionId - The unique identifier of the transaction to be found.
 * @returns {Promise<ITransaction | null>}
 * A promise resolving to either the found transaction object or null if it is not found.
 */
export const getTransactionById = async (
  transactionId: string
): Promise<ITransaction | null> => {
  return await Transaction.findById(transactionId).populate(
    "projectId buyerId "
  );
};

/**
 * Updates the status of a transaction.
 *
 * @param {string} transactionId - The unique identifier of the transaction to be updated.
 * @param {"successful" | "failed"} status - The new status of the transaction.
 * @returns {Promise<ITransaction | null>}
 * A promise resolving to either the updated transaction object or null if the transaction is not found.
 */
export const updateTransactionStatus = async (
  transactionId: string,
  status: "successful" | "failed"
): Promise<ITransaction | null> => {
  return await Transaction.findByIdAndUpdate(
    transactionId,
    { status },
    { new: true }
  );
};

/**
 * Deletes a transaction by its unique identifier.
 *
 * @param {string} transactionId - The unique identifier of the transaction to be deleted.
 * @returns {Promise<void>}
 * A promise that resolves when the transaction is successfully deleted.
 */

export const deleteTransaction = async (
  transactionId: string
): Promise<void> => {
  await Transaction.findByIdAndDelete(transactionId);
};
