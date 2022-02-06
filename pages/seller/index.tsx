import React from "react";
import LinkContainer from "../../components/Common/LinkContainer";
import ShopNav from "../../components/layouts/ShopNav";
import SellerItemTable from "../../components/Seller/SellerItemTable";

const Index = () => {
  return (
    <ShopNav>
      <LinkContainer href="/seller/add_item">
        <div className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <p>Add Item</p>
        </div>
      </LinkContainer>
      <SellerItemTable />
    </ShopNav>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: ["verified-seller", "admin"],
    },
  };
}

export default Index;
