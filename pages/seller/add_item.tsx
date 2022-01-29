import React from "react";
import InternalLink from "../../components/Common/Link";
import ShopNav from "../../components/layouts/ShopNav";
import AddItemForm from "../../components/Seller/AddItemForm";

const AddItem = () => {
  return (
    <ShopNav>
      <InternalLink
        name="Go Back to Dashboard"
        href="/seller"
        styling="pr-2 mb-4 cursor-pointer text-blue-400 hover:underline transition duration-75"
        type="seller"
      />
      <AddItemForm />
    </ShopNav>
  );
};

export default AddItem;

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: ["seller"],
    },
  };
}
