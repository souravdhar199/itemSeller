import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
import { toast } from "react-toastify";

export default function PrivateRoute() {
  const { loggedIN, check } = useAuthStatus();
  if (check) {
    return <></>;
  }
  return loggedIN ? (
    <Outlet />
  ) : (
    [toast("not signed in"), <Navigate to="/sign-in" />]
  );
}
