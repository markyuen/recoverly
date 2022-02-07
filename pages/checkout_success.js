import React from "react";
import ProtectedRoute from "../components/route/ProtectedRoute";
import Success from "../components/Checkout/Success";

const CheckoutSuccess = () => {
  return (
    <ProtectedRoute>
      <Success />
    </ProtectedRoute>
  );
};

export default CheckoutSuccess;
