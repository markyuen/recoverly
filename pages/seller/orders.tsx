import React from "react";
import Header from "../../components/Common/Header";
import ShopNav from "../../components/layouts/ShopNav";
import ProtectedRoute from "../../components/route/ProtectedRoute";

const Orders = () => {
  return (
    <ProtectedRoute>
      <ShopNav>
        <Header name="Customer Orders" />
        <p className="ml-6 mt-4">View orders placed with products that you have listed.</p>
      </ShopNav>
    </ProtectedRoute>
  );
};

export default Orders;
