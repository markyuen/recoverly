import React from "react";
import ApprovalTable from "../components/Admin/ApprovalTable";
import Header from "../components/Common/Header";
import ShopNav from "../components/layouts/ShopNav";

const Admin = () => {
  return (
    <ShopNav>
      <Header name="Admin Dashboard" />
      <div className="mt-4" />
      <ApprovalTable />
    </ShopNav>
  );
};

export default Admin;
