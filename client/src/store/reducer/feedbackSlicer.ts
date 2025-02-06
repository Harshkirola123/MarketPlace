import { apiSlice } from "../../service/apiSlicer";

export const feedbackSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Add new feedback
    addNewFeedback: builder.mutation({
      query: (newFeedback) => ({
        url: "/feedback/add",
        method: "POST",
        body: newFeedback,
      }),
      // Optionally add optimistic update or other side effects here
    }),
    getFeedbackByProject: builder.query({
      query: (id: string) => ({
        url: `/feedback/project/${id}`,
        method: "GET",
      }),
    }),
    // Edit feedback
    editFeedback: builder.mutation({
      query: (updatedFeedback) => ({
        url: "/feedback/edit",
        method: "PUT",
        body: updatedFeedback,
      }),
    }),

    // Delete feedback
    deleteFeedback: builder.mutation({
      query: (feedbackId) => ({
        url: "/feedback",
        method: "DELETE",
        body: { feedbackId },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddNewFeedbackMutation,
  useEditFeedbackMutation,
  useDeleteFeedbackMutation,
  useGetFeedbackByProjectQuery,
} = feedbackSlice;
