import React from "react";
import ApprovalTable from "../components/Admin/ApprovalTable";
import CategoryTable from "../components/Admin/CategoryTable";
import Header from "../components/Common/Header";
import ShopNav from "../components/layouts/ShopNav";
import ProtectedRoute from "../components/route/ProtectedRoute";

const Admin = () => {
  return (
    <ProtectedRoute>
      <ShopNav>
        <CategoryTable />
        <ApprovalTable />
      </ShopNav>
    </ProtectedRoute>
  );
};

export default Admin;
