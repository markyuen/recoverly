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

// TODO protect this page from sellers
// export async function getStaticProps(context) {
//   return {
//     props: {
//       protected: true,
//       userTypes: ["customer", "admin"],
//     },
//   };
// }

export default StripeAuthorization;
