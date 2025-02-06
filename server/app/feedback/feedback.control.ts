import { Request, Response } from "express";
import * as feedbackService from "./feedback.service";
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.helper";

/**
 * Adds a new feedback entry to the database.
 *
 * @function addNewFeedback
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {string} projectId - The id of the project to which the feedback is being added.
 * @param {string} id - The id of the user who is giving the feedback.
 * @param {number} rating - The user's rating for the project (1-5).
 * @param {string} feedback - The user's feedback text.
 * @returns {Promise<void>}
 * A promise resolving to an object with a status code and the newly created feedback entry.
 */
export const addNewFeedback = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId, rating, feedback } = req.body;
    const { id } = req.params;
    console.log(projectId, rating, feedback, id);
    const result = await feedbackService.addFeedback(
      projectId,
      id,
      rating,
      feedback
    );
    res.status(result.status).send(createResponse(result.data));
  }
);

/**
 * Updates an existing feedback entry in the database.
 *
 * @function editFeedback
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {string} feedbackId - The id of the feedback entry to be updated.
 * @param {number} rating - The new rating for the project (1-5).
 * @param {string} feedback - The new feedback text.
 * @returns {Promise<void>}
 * A promise resolving to an object with a status code and either the newly updated
 * feedback entry, or a string error message if the feedback entry was not found.
 */
export const editFeedback = asyncHandler(
  async (req: Request, res: Response) => {
    const { feedbackId, rating, feedback } = req.body;
    const result = await feedbackService.editFeedback(
      feedbackId,
      rating,
      feedback
    );
    res.status(result.status).send(createResponse(result.data));
  }
);

/**
 * Deletes an existing feedback entry in the database.
 *
 * @function deleteFeedback
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {string} feedbackId - The id of the feedback entry to be deleted.
 * @returns {Promise<void>}
 * A promise resolving to an object with a status code and a message indicating
 * whether the feedback entry was successfully deleted, or an error message if
 * the feedback entry was not found.
 */
export const deleteFeedback = asyncHandler(
  async (req: Request, res: Response) => {
    const { feedbackId } = req.body;
    const result = await feedbackService.deleteFeedback(feedbackId);
    res.status(result.status).send(createResponse(result.data));
  }
);

/**
 * Retrieves all feedback entries associated with a given project ID.
 *
 * @function getFeedbackByProject
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {string} projectId - The unique identifier of the project for which feedback is being retrieved.
 * @returns {Promise<void>}
 * A promise resolving to an object with a status code and an array of feedback entries.
 */
export const getFeedbackByProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId } = req.params;
    console.log(projectId);
    const result = await feedbackService.getFeedbackByProject(projectId);
    res.status(result.status).send(createResponse(result.data));
  }
);
