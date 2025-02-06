import { apiSlice } from "../../service/apiSlicer";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteUser: builder.mutation({
      query: () => ({
        url: `/user/delete`,
        method: "DELETE",
      }),
      // Optionally add additional responses or error handling
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          // You can add logic to handle the successful deletion (e.g., log out)
          console.log("Profile deleted successfully");
        } catch (error) {
          console.error("Failed to delete profile:", error);
        }
      },
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/user/update",
        method: "PATCH",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: `/user/getUserById`,
        method: "GET",
      }),
    }),
  }),
});

export const { useDeleteUserMutation, useUpdateUserMutation, useGetUserQuery } =
  userApiSlice;
