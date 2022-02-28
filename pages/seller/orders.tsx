import React from "react";
import Header from "../../components/Common/Header";
import LinkContainer from "../../components/Common/LinkContainer";
import ShopNav from "../../components/layouts/ShopNav";
import SellerOrders from "../../components/Orders/SellerOrders";
import ProtectedRoute from "../../components/route/ProtectedRoute";
import { PLATFORM_FEE_PCT } from "../../config";

const Orders = () => {
  return (
    <ProtectedRoute>
      <ShopNav>
        <Header name="Customer Orders" />
        <p className="ml-6 mt-4">View each order placed with products that you have listed. As the merchant, you must accept or reject each product in an order. If you choose to reject every item, then your part of the process is complete, and no funds will be released to you. If you accept at least one item, then you must arrange shipping and indicate once you have shipped out the accepted product(s). Once the customer has acknowleged receipt of products, then funds (after platform fee of {PLATFORM_FEE_PCT * 100}%) will be released to your connected Stripe account.</p>
        <SellerOrders />
        <div className="flex justify-center">
          <LinkContainer href="/">
            <div className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer justify-center">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
              <p>Return to main page</p>
            </div>
          </LinkContainer>
        </div>
      </ShopNav>
    </ProtectedRoute>
  );
};

export default Orders;
