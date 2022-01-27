import React from "react";
import ShopNav from "../../components/layouts/ShopNav";
import AddItemForm from "../../components/Seller/AddItemForm";

const AddItem = () => {
  return (
    <ShopNav>
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
