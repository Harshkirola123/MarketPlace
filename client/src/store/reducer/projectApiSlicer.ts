import { apiSlice } from "../../service/apiSlicer";

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // To add a new project
    addNewProject: builder.mutation({
      query: (projectData) => ({
        url: "/project/addProjects",
        method: "POST",
        body: projectData,
      }),
    }),

    // To get all project
    getAllProjects: builder.query({
      query: () => ({
        url: "/project/allProjects",
        method: "GET", // Assuming a GET request
      }),
    }),

    // To get user projects by user ID
    getUserProjects: builder.query({
      query: (projectId) => ({
        url: `/project/userProjects/${projectId}`,
        method: "POST",
      }),
    }),
    getAllUserProjects: builder.query({
      query: () => ({
        url: "/project/getUserProject",
        method: "GET", // Assuming a GET request
      }),
    }),
    getUserPurchaseProjects: builder.query({
      query: () => ({
        url: "/project/getBuyProject",
        method: "GET", // Assuming a GET request
      }),
    }),
  }),
});

export const {
  useAddNewProjectMutation,
  useGetAllProjectsQuery,
  useGetUserProjectsQuery,
  useGetAllUserProjectsQuery,
  useGetUserPurchaseProjectsQuery,
} = projectApiSlice;
