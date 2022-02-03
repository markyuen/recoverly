import { useRouter } from "next/router";
import React, { useState } from "react";
import { ItemPageData, ItemProp } from "../../types/items";
import { getItem } from "../api/get-item";
import Image from "next/image";
import InternalLink from "../../components/Common/Link";
import ShopNav from "../../components/layouts/ShopNav";
import QuantityButton from "../../components/Product/QuantityButton";
import { makeGraphQLQuery, serverSideHasura } from "../../lib/GraphQL";
import ImageViewer from "../../components/Common/ImageViewer";
import { Tag } from "@chakra-ui/react";
import Link from "next/link";
import { generateItemSlugLink } from "../../lib/string";
import ItemDescription from "../../components/Item/ItemDescription";
import PDFViewer from "../../components/Common/PDFViewer";

type ProductPageProp = {
  data: ItemPageData;
};

const Product = ({ data }: ProductPageProp) => {
  const router = useRouter();
  const [currPrice, setCurrPrice] = useState(null);
  const [currQty, setCurrQty] = useState(null);

  // Refactor to use useSWR, ISG might not be the best

  if (!data) {
    return <div>loading....</div>;
  }

  const {
    product_id,
    brand: { brand_name },
    product_images,
    product_specifications,
    product_name,
    description,
    products_categories,
    variations,
  } = data;

  console.log(data);
  return (
    <ShopNav>
      <div className="w-full max-w-4xl rounded   mx-auto text-gray-800 relative md:text-left">
        <div className="md:flex items-center -mx-10">
          <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
            <ImageViewer
              images={product_images.map((item) => {
                return {
                  image_url: item.url,
                };
              })}
            />
          </div>
          <div className="w-full md:w-1/2 px-10">
            <h1 className="text-xl font-bold">{product_name}</h1>
            <p className="text-gray-700 text-sm">{brand_name}</p>
            {currPrice && (
              <p className="text-gray-700 text-sm">
                ${currPrice} with {currQty} remaining
              </p>
            )}
            <p className="mt-4">Tagged Categories: </p>
            {products_categories &&
              products_categories.map(
                ({ category: { category_name } }, index) => {
                  console.log(category_name);
                  return (
                    <Tag
                      variant="solid"
                      colorScheme="teal"
                      key={index}
                      className="mr-4 mb-4"
                    >
                      <Link
                        href={{
                          pathname: "/category/[category_slug]",
                          query: {
                            category_slug: generateItemSlugLink(category_name),
                          },
                        }}
                      >
                        {category_name}
                      </Link>
                    </Tag>
                  );
                }
              )}
            <p>Variations:</p>
            <div className="grid mt-2 grid-cols-3 gap-y-2">
              {variations.map(
                (
                  { variation_1, variation_2, discounted_price, quantity },
                  index
                ) => {
                  return (
                    <Tag
                      onClick={() => {
                        setCurrPrice(discounted_price);
                        setCurrQty(quantity);
                      }}
                      className="cursor-pointer mr-2 mb-2 col-span-1"
                      key={index}
                    >
                      <p>
                        {variation_1}/{variation_1}
                      </p>
                    </Tag>
                  );
                }
              )}
            </div>

            {/* <p className="text-sm">SGD$ {price}</p> */}
            {/* <QuantityButton data={data} /> */}
          </div>
        </div>
        <div className="my-6 prose max-w-lg prose-indigo prose-lg text-gray-500 mx-auto">
          <p className="my-8 text-xl text-gray-500 leading-8">
            About the Product
          </p>
          <p>{description}</p>
        </div>
        <div className="my-6 prose max-w-lg prose-indigo prose-lg text-gray-500 mx-auto">
          <p className="my-8 text-xl text-gray-500 leading-8">
            Product Specifications
          </p>
          <PDFViewer pdfs={product_specifications} />
        </div>
        {/* <ItemDescription
          Tabs={["Description", "Specifications", "Merchant Info", "Reviews"]}
          description={description}
        /> */}
      </div>
    </ShopNav>
  );
};

export async function getStaticPaths() {
  const ids = await serverSideHasura("getProductIDs", {});
  const paths = ids["product"].map(({ product_id }) => {
    return {
      params: {
        id: product_id.toString(),
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
  const data = await serverSideHasura("getProductInformation", {
    product_id: id,
  });
  console.log(data["product"]);

  return {
    props: {
      data: data["product"].length > 0 ? data["product"][0] : [],
    },
  };
}

export default Product;
