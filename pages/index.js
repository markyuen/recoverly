import axios from "axios";
import React from "react";

// Import Components
import Categories from "../components/Category/Categories";
import { getCategories } from "./api/get-category";

const Index = ({ categories }) => {
  return (
    <>
      <Categories categories={categories} />
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
