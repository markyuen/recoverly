import React from "react";
import ProtectedRoute from "../components/route/ProtectedRoute";
import StripeAuthorize from "../components/Seller/StripeAuthorize";

const StripeAuthorization = () => {
  return (
    <ProtectedRoute>
      <StripeAuthorize />
    </ProtectedRoute>
  );
};

export default StripeAuthorization;
