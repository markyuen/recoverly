import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/Common/Header";
import InternalLink from "../../components/Common/Link";

// Helper Functions
import { capitalizeFirstLetter } from "../../lib/string";
import { getCategoryItems } from "../api/get-category-items";
import { getCategories } from "../api/get-category";
import ItemCard from "../../components/Item/ItemCard";
import ShopNav from "../../components/layouts/ShopNav";

type CategoryProps = {
  items: any[];
};

const Category = ({ items }) => {
  const router = useRouter();

  const id = router.query["id"] as string;
  const name = id
    ? id
        .split("-")
        .map((item) => capitalizeFirstLetter(item))
        .join(" ")
    : "";

  return (
    <ShopNav>
      <InternalLink
        type="customer"
        name="← View All Categories"
        href="/"
        styling="px-2 cursor-pointer text-blue-400 hover:underline transition duration-75"
      />
      <Header name={name} />
      <div className="grid grid-cols-3 mx-4 pt-10">
        {items &&
          items.map((item, index) => {
            return <ItemCard key={index} item={item} />;
          })}
      </div>
    </ShopNav>
  );
};

export async function getStaticPaths() {
  const categories = await getCategories();
  const paths = categories.map((item) => {
    return {
      params: {
        id: item.name.toLowerCase().split(" ").join("-"),
      },
    };
  });

  return {
    paths,
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps() {
  const items = await getCategoryItems();

  return {
    props: {
      items: items.data,
    },
  };
}

export default Category;
