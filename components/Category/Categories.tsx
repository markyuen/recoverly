import axios from "axios";
import React, { useEffect } from "react";
import useSWR from "swr";
import { fetcherWithBody } from "../../lib/swr";
import Header from "../Common/Header";
import CategoryCard from "./CategoryCard";
import { getProducts } from "../../queries/getProducts";

type CategoryData = {
  name: string;
  image_url: string;
};

type CategoriesProp = {
  categories: CategoryData[];
};

const Categories = ({ categories }: CategoriesProp) => {
  const { data, error } = useSWR(
    [
      "/api/graphql/getProducts",
      {
        query: getProducts,
      },
    ],
    fetcherWithBody
  );

  return (
    <div>
      <Header name="Categories" />
      {!data ? <div>Loading Query</div> : <div>Data Loaded</div>}
      <div className="grid grid-cols-2 md:grid-cols-4 mt-10 gap-x-4 gap-y-4">
        {categories &&
          categories.map((item, index) => {
            const { name, image_url } = item;

            return (
              <CategoryCard key={index} name={name} image_url={image_url} />
            );
          })}
      </div>
    </div>
  );
};

export default Categories;
