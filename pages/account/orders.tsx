import React from "react";
import Header from "../../components/Common/Header";
import ShopNav from "../../components/layouts/ShopNav";
import ProtectedRoute from "../../components/route/ProtectedRoute";
import UserOrders from "../../components/Orders/UserOrders";

const Orders = () => {
  return (
    <ProtectedRoute>
      <ShopNav>
        <Header name="Your Orders" />
        <p className="ml-6 mt-4">View the orders you have placed and their current status</p>
        <UserOrders />
      </ShopNav>
    </ProtectedRoute>
  );
};

export default Orders;
