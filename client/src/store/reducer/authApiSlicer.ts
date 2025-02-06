import { apiSlice } from "../../service/apiSlicer";

/**
 * The auth API slice, which handles user authentication and authorization.
 *
 * This slice exports endpoints for signing up, logging in, and logging out.
 *
 * @namespace authApiSlice
 */
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/user/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    userLogin: builder.mutation({
      query: (credentials) => ({
        url: "/user/signIn",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: { password },
        headers: {
          authorization: `Bearer ${token}`,
          ContentType: "application/json",
        },
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useUserLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutUserMutation,
} = authApiSlice;
