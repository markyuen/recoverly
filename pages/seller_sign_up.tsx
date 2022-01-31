import React from "react";
import Header from "../components/Common/Header";
import ShopNav from "../components/layouts/ShopNav";
import ProtectedRoute from "../components/route/ProtectedRoute";
import SellerSignUpForm from "../components/Seller/SellerSignUpForm";

const SellerSignUp = () => {
  return (
    <ProtectedRoute>
      <ShopNav>
        <Header name="Seller Sign Up Form" />
        <p className="ml-6 mt-4">Fill in some business details and verify your identity with Stripe to receive payouts for your completed sales.</p>
        <SellerSignUpForm />
      </ShopNav>
    </ProtectedRoute>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: ["unverified-seller", "admin"],
    },
  };
}

export default SellerSignUp;
