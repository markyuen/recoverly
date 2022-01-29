import React from "react";
import ApprovalTable from "../components/Admin/ApprovalTable";
import CategoryTable from "../components/Admin/CategoryTable";
import ShopNav from "../components/layouts/ShopNav";
import ProtectedRoute from "../components/route/ProtectedRoute";

const Admin = () => {
  return (
    <ProtectedRoute>
      <ShopNav>
        <ApprovalTable />
        <CategoryTable />
      </ShopNav>
    </ProtectedRoute>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: ["admin"],
    },
  };
}

export default Admin;
