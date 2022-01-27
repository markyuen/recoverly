import React from "react";
import InternalLink from "../../components/Common/Link";
import ShopNav from "../../components/layouts/ShopNav";

const Index = () => {
  return (
    <ShopNav>
      This is a main seller dashboard. Click{" "}
      <InternalLink
        name="add Item"
        href="/Seller/add_item"
        styling=""
        type="seller"
      />{" "}
      to add an item
    </ShopNav>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: ["seller"],
    },
  };
}

export default Index;
