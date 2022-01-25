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

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: ["user", "admin"],
    },
  };
}

export default StripeAuthorization;
