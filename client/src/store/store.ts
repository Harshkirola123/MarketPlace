// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./reducer/authSlicer";
import { apiSlice } from "../service/apiSlicer";

/**
 * Configures and exports the Redux store.
 *
 * The store is configured with the following reducers:
 * - auth: Handles authentication-related state.
 * - apiSlice: Handles API interactions and caching.
 *
 * Custom middleware is added to handle API slice middleware.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
