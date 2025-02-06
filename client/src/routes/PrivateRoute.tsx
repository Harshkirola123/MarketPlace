import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store"; // Assuming you're using Redux
import { selectCurrentuser } from "../store/reducer/authSlicer";

/**
 * A wrapper around the Outlet component that checks if the user is logged in.
 * If the user is logged in, it renders the Outlet component.
 * If the user is not logged in, it redirects to the signin page.
 */
const PrivateRoute = () => {
  const user = useAppSelector(selectCurrentuser); // Assuming user is stored in auth slice

  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
