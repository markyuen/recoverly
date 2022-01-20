import React from "react";
import ProtectedRoute from "../components/route/ProtectedRoute";

const Account = () => {
  return <ProtectedRoute>This is an account page</ProtectedRoute>;
};

export default Account;
