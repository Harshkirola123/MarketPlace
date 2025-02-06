import Feedback from "./Feedback.schema";
import IFeedback from "./Feedback.dto";

/**
 * Adds a new feedback entry to the database.
 *
 * @param {string} projectId - The id of the project to which the feedback is being added.
 * @param {string} userId - The id of the user who is giving the feedback.
 * @param {number} rating - The user's rating for the project (1-5).
 * @param {string} feedback - The user's feedback text.
 * @returns {Promise<{status: number, data: IFeedback}>}
 * A promise resolving to an object with a status code and the newly created feedback entry.
 */
export const addFeedback = async (
  projectId: string,
  userId: string,
  rating: number,
  feedback: string
) => {
  const newFeedback = new Feedback({
    projectId,
    userId,
    rating,
    feedback,
  });
  await newFeedback.save();
  return { status: 201, data: newFeedback };
};

/**
 * Updates an existing feedback entry in the database.
 *
 * @param {string} feedbackId - The id of the feedback entry to be updated.
 * @param {number} rating - The new rating for the project (1-5).
 * @param {string} feedback - The new feedback text.
 * @returns {Promise<{status: number, data: IFeedback | string}>}
 * A promise resolving to an object with a status code and either the newly updated
 * feedback entry, or a string error message if the feedback entry was not found.
 */
export const editFeedback = async (
  feedbackId: string,
  rating: number,
  feedback: string
): Promise<{ status: number; data: IFeedback | string }> => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      feedbackId,
      { rating, feedback },
      { new: true }
    );

    if (!updatedFeedback) {
      return { status: 404, data: "Feedback not found." };
    }

    return { status: 200, data: updatedFeedback };
  } catch (error) {
    return { status: 500, data: "Failed to edit feedback." };
  }
};

/**
 * Deletes an existing feedback entry in the database.
 *
 * @param {string} feedbackId - The id of the feedback entry to be deleted.
 * @returns {Promise<{status: number, data: string}>}
 * A promise resolving to an object with a status code and a message indicating
 * whether the feedback entry was successfully deleted, or an error message if
 * the feedback entry was not found.
 */
export const deleteFeedback = async (
  feedbackId: string
): Promise<{ status: number; data: string }> => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);

    if (!deletedFeedback) {
      return { status: 404, data: "Feedback not found." };
    }

    return { status: 200, data: "Feedback deleted successfully." };
  } catch (error) {
    return { status: 500, data: "Failed to delete feedback." };
  }
};

/**
 * Retrieves all feedback entries associated with a given project ID.
 *
 * @param {string} projectId - The unique identifier of the project for which feedback is being retrieved.
 * @returns {Promise<{status: number, data: IFeedback[]}>}
 * A promise resolving to an object with a status code and an array of feedback entries.
 */

export const getFeedbackByProject = async (projectId: string) => {
  const feedbacks = await Feedback.find({ projectId }).populate("userId");
  // if (!feedbacks || feedbacks.length === 0) {
  //   return { status: 404, data: "No feedback found for this project." };
  // }

  return { status: 200, data: feedbacks };
};
