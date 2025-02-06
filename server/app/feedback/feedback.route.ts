import express from "express";
import * as feedbackController from "./feedback.control";
import { roleAuthMiddleware } from "../common/middleware/role-auth.middleware";
import { userEnum } from "../user/user.dto";

const router = express.Router();

// Route to add feedback
/**
 * Routes for feedback operations.
 *
 * @module routes/feedback
 */

/**
 * Route to add new feedback.
 *
 * @name POST /add
 * @function
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware in the stack.
 */
router.post(
  "/add",
  roleAuthMiddleware([...userEnum]),
  feedbackController.addNewFeedback
);

/**
 * Route to edit feedback.
 *
 * @name PUT /edit
 * @function
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware in the stack.
 */
router.put("/edit", feedbackController.editFeedback);

/**
 * Route to delete feedback.
 *
 * @name DELETE /delete
 * @function
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware in the stack.
 */
router.delete("/delete", feedbackController.deleteFeedback);

/**
 * Route to get feedback by project ID.
 *
 * @name GET /project/:projectId
 * @function
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware in the stack.
 */
router.get("/project/:projectId", feedbackController.getFeedbackByProject);

export default router;
