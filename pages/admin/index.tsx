import React from "react";
import ApprovalTable from "../../components/Admin/ApprovalTable";
import CategoryTable from "../../components/Admin/CategoryTable";
import InternalLink from "../../components/Common/Link";
import ShopNav from "../../components/layouts/ShopNav";
import ProtectedRoute from "../../components/route/ProtectedRoute";

const Admin = () => {
  return (
    <ProtectedRoute>
      <ShopNav>
        <InternalLink
          name="Add Item For Seller"
          href="/seller/add_item"
          styling="pr-2 mb-4 cursor-pointer text-blue-400 hover:underline transition duration-75"
          type="admin"
        />
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
