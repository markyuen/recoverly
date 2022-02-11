import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeGraphQLQuery } from "../lib/GraphQL";

const useCategoryItems = (categoryName, offset) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    makeGraphQLQuery("getCategoryItems", {
      category_name: categoryName,
      offset,
      limit: 80,
    })
      .then((res) => {
        const newItems = res["category"][0]["products_categories"];
        setItems((items) => items.concat(newItems));
        console.log(newItems);
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
  };
};

export default useCategoryItems;
// function useSearchBook(query, pageNum) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [books, setBooks] = useState([]);
//   const [hasMore, setHasMore] = useState(false);

//   useEffect(() => {
//     setBooks([]);
//   }, [query]);

//   useEffect(() => {
//     const CancelToken = axios.CancelToken;
//     let cancel;

//     setIsLoading(true);
//     setError(false);

//     axios
//       .get(`https://openlibrary.org/search.json?q=${query}&page=${pageNum}`, {
//         cancelToken: new CancelToken((c) => (cancel = c))
//       })
//       .then((res) => {
//         setBooks((prev) => {
//           return [...new Set([...prev, ...res.data.docs.map((d) => d.title)])];
//         });
//         setHasMore(res.data.docs.length > 0);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         if (axios.isCancel(err)) return;
//         setError(err);
//       });

//     return () => cancel();
//   }, [query, pageNum]);

//   return { isLoading, error, books, hasMore };
// }

// export default useSearchBook;
