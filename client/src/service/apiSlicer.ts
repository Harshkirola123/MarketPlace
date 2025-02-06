import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { loginSuccess, logout } from "../store/reducer/authSlicer";
import type { RootState } from "../store/store";
import { User } from "../type.dto";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const refreshQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.refreshToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

/**
 * Handles auto-refreshing of the access token when it expires
 *
 * - If the request returns a 401 status, it will attempt to refresh the
 *   access token using the refresh token.
 * - If the refresh token is also invalid, it will log the user out.
 * - If the access token is successfully refreshed, it will retry the original
 *   request with the new token.
 */
const baseQueryWithReauth = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    console.warn("Access token expired, attempting refresh...");

    const refreshResult = await refreshQuery(
      "/auth/refresh",
      api,
      extraOptions
    );
    // console.log(refreshResult.data.data.accessToken);
    if (refreshResult?.data) {
      const user = (api.getState() as RootState).auth.user as User;

      // Save new access token
      api.dispatch(
        loginSuccess({
          accessToken: refreshResult.data.data.accessToken,
          user,
          refreshToken: refreshResult.data.data.refreshToken,
        })
      );

      // Retry the original request with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error("Refresh token invalid, logging out...");
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
