import React from "react";
import Header from "../../components/Common/Header";
import InternalLink from "../../components/Common/Link";
import LinkContainer from "../../components/Common/LinkContainer";
import ShopNav from "../../components/layouts/ShopNav";
import UserProfile from "../../components/Profile/UserProfile";
import ProtectedRoute from "../../components/route/ProtectedRoute";

const Account = () => {
  return (
    <ProtectedRoute>
      <ShopNav>
        <Header name="Your Account" />
        <p className="ml-6 mt-4">Manage and protect your profile</p>
        <div className="flex justify-center">
          <LinkContainer href="/account/orders">
            <div className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer justify-center">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
              <p>Click here to view your orders.</p>
            </div>
          </LinkContainer>
        </div>
        <UserProfile />
      </ShopNav>
    </ProtectedRoute>
  );
};

export default Account;
