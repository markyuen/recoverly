import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeGraphQLQuery } from "../lib/GraphQL";

const useCategoryItems = (categoryName) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState([]);
  const [subcategories, setSubcatgories] = useState([]);
  const [offset, setOffset] = useState(0);

  const increaseOffset = () => {
    setOffset((offset) => offset + 80);
  };

  useEffect(() => {
    setPages([]);
    setItems([]);
    setIsLoading(true);
    setSubcatgories([]);
    setOffset(0);
  }, [categoryName]);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    makeGraphQLQuery("getCategoryItems", {
      category_name: categoryName,
      offset,
      limit: 80,
    })
      .then((res) => {
        console.log(res);
        const { category, categories } = res["category"][0];
        setPages([
          {
            name: categoryName,
            href: "/category/[category_slug]",
            current: true,
          },
        ]);
        if (category) {
          setPages([
            {
              name: category.category_name,
              href: "/category/[category_slug]",
              current: false,
            },
            {
              name: categoryName,
              href: "/category/[category_slug]",
              current: true,
            },
          ]);
        }
        if (categories && categories.length > 0) {
          setSubcatgories(categories);
        }

        const newItems = res["category"][0]["products_categories"];
        setItems((items) => items.concat(newItems));

        if (newItems.length < 80) {
          setHasMore(false);
        }
        setIsLoading(false);
        console.log("Obtained new Items of length: " + newItems.length);
      })
      .catch((err) => console.log(err));
  }, [offset, categoryName]);

  return {
    isLoading,
    error,
    items,
    hasMore,
    pages,
    subcategories,
    increaseOffset,
  };
};

export default useCategoryItems;
