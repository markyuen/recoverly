import React, { useState } from "react";
import Header from "../Common/Header";
import getPopularItems from "../../queries/getPopularItems";
import { fetcherWithBody } from "../../lib/swr";
import useSWR from "swr";
import SkeletonGrid from "../Skeleton/SkeletonGrid";
import ItemCard from "../Item/ItemCard";

const PopularItems = () => {
  const { data, error } = useSWR(
    {
      url: "/api/graphql/getPopularItems",
      body: {
        query: getPopularItems,
      },
    },
    fetcherWithBody
  );

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(7);

  const incrementIndex = () => {
    setStart((start) => start + 7);
    setEnd((end) => end + 7);
  };

  const decrementIndex = () => {
    setStart((start) => start - 7);
    setEnd((end) => end - 7);
  };

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

  console.log(data[0]["product"]);

  return (
    <div className="mt-20">
      <Header name="Popular Items" />
      <div className="flex items-center">
        {start > 0 && (
          <svg
            onClick={decrementIndex}
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 cursor-pointer mr-4"
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
        <div className="grid grid-cols-4 mx-4 pt-10">
          {data &&
            data[0]["product"]
              .filter((_, index) => index >= start && index <= end)
              .map((product, index) => {
                return (
                  // <div>{product.product_name}</div>
                  <div key={index}>
                    <ItemCard key={index} item={product} />
                  </div>
                );
              })}
        </div>
        {data && data[0]["product"] && start < data[0]["product"].length - 20 && (
          <svg
            onClick={incrementIndex}
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 cursor-pointer ml-4"
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
    </div>
  );
};

export default PopularItems;
