import React from "react";

// Import Components
import Categories from "../components/Category/Categories";
import ShopNav from "../components/layouts/ShopNav";

const Index = ({ categories }) => {
  return (
    <>
      <ShopNav>
        <Categories />
      </ShopNav>
    </>
  );
};

export default Index;
