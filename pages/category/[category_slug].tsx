import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/Common/Header";
import InternalLink from "../../components/Common/Link";

// Helper Functions
import {
  capitalizeFirstLetter,
  decodeItemSlug,
  generateItemSlugLink,
} from "../../lib/string";
import ItemCard from "../../components/Item/ItemCard";
import ShopNav from "../../components/layouts/ShopNav";
import { serverSideHasura } from "../../lib/GraphQL";
import { fetcherWithBody } from "../../lib/swr";
import getCategoryItems from "../../queries/getCategoryItems";
import useSWR from "swr";
import SkeletonGrid from "../../components/Skeleton/SkeletonGrid";

type CategoryProps = {
  category_name: string;
};

const Category = ({ category_name }: CategoryProps) => {
  const router = useRouter();
  const { data, error } = useSWR(
    [
      "/api/graphql/getCategoryItems",
      {
        query: getCategoryItems,
        variables: { category_name },
      },
    ],
    fetcherWithBody
  );

  if (!data && !error) {
    return (
      <ShopNav>
        <Header name={category_name} />
        <div className="grid grid-cols-2 md:grid-cols-4 mt-10 gap-x-4 gap-y-4">
          <SkeletonGrid count={8} />
        </div>
      </ShopNav>
    );
  }

  return (
    <ShopNav>
      <InternalLink
        type="customer"
        name="← View All Categories"
        href="/"
        styling="px-2 cursor-pointer text-blue-400 hover:underline transition duration-75"
      />
      <Header name={category_name} />
      <div className="grid grid-cols-3 mx-4 pt-10">
        {data &&
          data.category &&
          data.category[0] &&
          data.category[0]["products_categories"] &&
          data.category[0]["products_categories"].length > 0 &&
          data.category[0]["products_categories"].map(({ product }, index) => {
            return <p key={index}>{product.product_name}</p>;
          })}
      </div>
    </ShopNav>
  );
};

export async function getStaticPaths() {
  const { category } = await serverSideHasura("getCategoryNames", null);
  const category_ids = category
    .map((item) => item.category_name)
    .map((item) => {
      return {
        params: {
          category_slug: generateItemSlugLink(item),
        },
      };
    });
  return {
    paths: category_ids,
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const items = [];
  const category_slug = encodeURIComponent(context.params.category_slug);
  const category_name = decodeItemSlug(category_slug);

  return {
    props: {
      category_name,
    },
  };
}

export default Category;
