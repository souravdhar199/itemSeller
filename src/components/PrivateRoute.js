import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const dummy = false;
  return dummy ? <Outlet /> : <Navigate to="/sign-in" />;
}
