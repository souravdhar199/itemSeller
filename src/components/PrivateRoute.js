import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";

export default function PrivateRoute() {
  const { loggedIN, check } = useAuthStatus();
  if (check) {
    return <></>;
  }
  return loggedIN ? <Outlet /> : [<Navigate to="/sign-in" />];
}
