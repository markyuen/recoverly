import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
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
import BreadCrumbs from "../../components/Common/BreadCrumbs";
import SubCategoryLink from "../../components/Category/SubCategoryLink";
import useCategoryItems from "../../hooks/useCategoryItems";
import SpinnerWithMessage from "../../components/Common/SpinnerWithMessage";
import useInView from "react-cool-inview";

type CategoryProps = {
  category_name: string;
};

const Category = ({ category_name }: CategoryProps) => {
  const router = useRouter();
  const observer = useRef();

  const [offset, setOffset] = useState(0);
  const { isLoading, error, items, hasMore } = useCategoryItems(
    category_name,
    offset
  );


  const { observe } = useInView({
    // For better UX, we can grow the root margin so the data will be loaded earlier
    rootMargin: "100px 0px",
    // When the last item comes to the viewport
    onEnter: ({ unobserve }) => {
      // Pause observe when loading data
      unobserve();
      // Load more data
      console.log("----Triggered");
      if (!hasMore) return;
      setOffset((offset) => offset + 40);
    },
  });


  if (!data && !error) {
    return (
      <ShopNav>
        <SpinnerWithMessage label="Downloading Items" />
      </ShopNav>
    );
  }


  return (
    <ShopNav>
      {/* <BreadCrumbs
        pages={pages.concat([
          {
            name: category_name,
            href: "/category/[category_slug]",
            current: true,
          },
        ])}
      /> */}
      <Header name={category_name} />
      {/* {data.category[0].categories.length > 0 && (
        <p className="text-2xl pt-4 ml-4 lg:px-0 font-bold text-black">
          Subcategories
        </p>
      )} */}
      {/* {data.category.categories[0].map((item, index) => {
        return <Link>{item.category_name}</Link>;
      })} */}
      <div className="flex pl-4 items-center flex-wrap">
        {/* {data.category[0].categories.map((item, index) => {
          return <SubCategoryLink name={item.category_name} key={index} />;
        })} */}
      </div>

      <p className="mt-10 text-2xl pt-4 ml-4 lg:px-0 font-bold text-black">
        Browse Items
      </p>
      <div className="grid grid-cols-3 mx-4 pt-10">
        {items.map(({ product }, index) => {
          return (
            <div
              key={index}
              ref={
                index === Math.round(items.length - 0.3 * 80) ? observe : null
              }
            >
              <ItemCard key={index} item={product} />
            </div>
          );
        })}
      </div>
      {isLoading && <SpinnerWithMessage label="Finding more items" />}
      {!hasMore && <p>No More Products Found</p>}
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
