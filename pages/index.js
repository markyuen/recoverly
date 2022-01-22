import React from "react";

// Import Components
import Categories from "../components/Category/Categories";
import { getCategories } from "./api/get-category";
import ShopNav from "../components/layouts/ShopNav";

const Index = ({ categories }) => {
  return (
    <>
      <ShopNav>
        <Categories categories={categories} />
      </ShopNav>
    </>
  );
};

export default Index;

export async function getStaticProps() {
  const categories = await getCategories();

  return {
    props: {
      categories,
    },
  };
}
