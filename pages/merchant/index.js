import React from "react";
import ShopNav from "../../components/layouts/ShopNav";

const Index = () => {
  return (
    <ShopNav>
      <h1>Merchant Page</h1>
    </ShopNav>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: ["verified-seller", "unverified-seller", "admin"],
    },
  };
}

export default Index;
