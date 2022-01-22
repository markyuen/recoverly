import axios from "axios";
import React, { useEffect } from "react";
import useSWR from "swr";
import { fetcherWithBody } from "../../lib/swr";
import Header from "../Common/Header";
import CategoryCard from "./CategoryCard";
import { getCategories } from "../../queries/getCategories";
import { Skeleton } from "@chakra-ui/react";
import SkeletonGrid from "../Skeleton/SkeletonGrid";

type CategoryData = {
  category_name: string;
  image_url: string;
};

type CategoriesProp = {
  categories: CategoryData[];
};

const Categories = ({ categories }: CategoriesProp) => {
  const { data, error } = useSWR(
    [
      "/api/graphql/getCategories",
      {
        query: getCategories,
      },
    ],
    fetcherWithBody
  );

  if (!data && !error) {
    return (
      <div>
        <Header name="Categories" />
        <div className="grid grid-cols-2 md:grid-cols-4 mt-10 gap-x-4 gap-y-4">
          <SkeletonGrid count={8} />
        </div>
      </div>
    );
  }

  console.log(data.category);

  return (
    <div>
      <Header name="Categories" />
      <div className="grid grid-cols-2 md:grid-cols-4 mt-10 gap-x-4 gap-y-4">
        {data.category &&
          data.category.map((item, index) => {
            const { category_name, image_url } = item;

            return (
              <CategoryCard
                key={index}
                name={category_name}
                image_url={image_url}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Categories;
