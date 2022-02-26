import React from "react";
import Header from "../../components/Common/Header";
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
      </ShopNav>
    </ProtectedRoute>
  );
};

export default Orders;
