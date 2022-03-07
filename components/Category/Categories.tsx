import React, { useState } from "react";
import useSWR from "swr";
import { fetcherWithBody } from "../../lib/swr";
import Header from "../Common/Header";
import CategoryCard from "./CategoryCard";
import getParentCategories from "../../queries/getParentCategories";
import SkeletonGrid from "../Skeleton/SkeletonGrid";
import useTranslationHook from "../../hooks/useTranslationHook";

const Categories = () => {
  const { data, error } = useSWR(
    {
      url: "/api/graphql/getParentCategories",
      body: {
        query: getParentCategories,
      },
    },
    fetcherWithBody
  );

  const { translate } = useTranslationHook();

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);

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

  const incrementIndex = () => {
    setStart((start) => start + 1);
    setEnd((end) => end + 1);
  };

  const decrementIndex = () => {
    setStart((start) => start - 1);
    setEnd((end) => end - 1);
  };

  console.log(data);
  return (
    <>
      <Header name={translate("Categories")} />
      <div className="flex items-center ">
        {start > 0 && (
          <svg
            onClick={decrementIndex}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer mr-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 my-4 ">
          {data &&
            data[0].category &&
            data[0].category
              .filter((item, index) => index >= start && index <= end)
              .map((item, index) => {
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
        {data && data[0].category && start < data[0].category.length - 4 && (
          <svg
            onClick={incrementIndex}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer ml-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </div>
    </>
  );
};

export default Categories;
