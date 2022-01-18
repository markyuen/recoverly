import { useRouter } from "next/router";
import React from "react";
import { getCategories } from "../api/get-category";
import { getItem } from "../api/get-item";

const Product = ({ data }) => {
  const router = useRouter();
  const item = data[0];

  console.log(item);
  return <div>Information on Item {router.query.id}</div>;
};

export async function getStaticPaths() {
  const categories = await getCategories();
  const paths = categories.map((item, index) => {
    return {
      params: {
        id: index.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const data = await getItem(id);

  return {
    props: {
      data,
    },
  };
}

export default Product;
