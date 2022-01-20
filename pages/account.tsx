import React from "react";
import Header from "../components/Common/Header";
import ShopNav from "../components/layouts/ShopNav";
import UserProfile from "../components/Profile/UserProfile";
import ProtectedRoute from "../components/route/ProtectedRoute";

const Account = () => {
  return (
    <ProtectedRoute>
      <ShopNav>
        <Header name="Your Account" />
        <p className="ml-6 mt-4">Manage and protect your profile</p>
        <UserProfile />
      </ShopNav>
    </ProtectedRoute>
  );
};

export default Account;
