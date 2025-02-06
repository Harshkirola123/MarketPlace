import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../type.dto";
import { RootState } from "../store";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null; // Store user info if needed (e.g. userId, email, etc.)
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
};

/**
 * Auth reducer slice
 * @module authReducer
 */
const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: User;
        refreshToken: string;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
    update: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }>
    ) => {
      state.accessToken = localStorage.getItem("accessToken");
      state.refreshToken = localStorage.getItem("refreshToken");
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout, update, setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentuser = (state: RootState) => state.auth.user;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
