import React from "react";
import ApprovalTable from "../components/Admin/ApprovalTable";
import Header from "../components/Common/Header";
import ShopNav from "../components/layouts/ShopNav";
import ProtectedRoute from "../components/route/ProtectedRoute";

const Admin = () => {
  return (
    <ProtectedRoute>
      <ShopNav>
        <Header name="Admin Dashboard" />
        <div className="mt-4" />
        <ApprovalTable />
      </ShopNav>
    </ProtectedRoute>
  );
};

export default Admin;
