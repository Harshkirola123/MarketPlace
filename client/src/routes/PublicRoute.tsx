import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store"; // Assuming you're using Redux
import { selectCurrentuser } from "../store/reducer/authSlicer";

interface PublicRouteProps {
  restricted?: boolean;
}

/**
 * A wrapper around the Outlet component that checks if the user is logged in.
 * If the user is not logged in, it renders the Outlet component.
 * If the user is logged in and the restricted prop is true, it redirects to the profile page.
 * Intended for use in routes that should only be accessible to logged out users.
 * @param {boolean} [restricted=false] If true, redirects to profile page if user is logged in.
 */
const PublicRoute: React.FC<PublicRouteProps> = ({ restricted }) => {
  const user = useAppSelector(selectCurrentuser); // Get user from Redux store

  if (user && restricted) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
