import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ItemPageData, ItemProp } from "../../types/items";
import ShopNav from "../../components/layouts/ShopNav";
import { serverSideHasura } from "../../lib/GraphQL";
import ImageViewer from "../../components/Common/ImageViewer";
import { Button, Tag } from "@chakra-ui/react";
import Link from "next/link";
import { generateItemSlugLink } from "../../lib/string";
import PDFViewer from "../../components/Common/PDFViewer";
import { useCart } from "../../context/CartContext";
import QuantityButton from "../../components/Product/QuantityButton";
import QuantityButtonWithAddToCart from "../../components/Product/QuantityButtonWithDispatch";

type ProductPageProp = {
  data: ItemPageData;
};

type ProductVariation = {
  variation_1: string;
  variation_2: string;
  price: number;
  quantity: number;
};

const Product = ({ data }: ProductPageProp) => {
  const router = useRouter();
  const { cartItems, getProductCount } = useCart();

  const [currPrice, setCurrPrice] = useState(null);
  const [currQty, setCurrQty] = useState(null);
  const [currVariation, setCurrVariation] = useState<ProductVariation>(null);
  const [currCount, setCurrCount] = useState(null);
  const [currPrevPrice, setCurrPrevPrice] = useState(null);

  // TODO: Fix Dependency Array using get Callback
  useEffect(() => {
    if (!currVariation || !data) {
      return;
    }
    const { variation_1, variation_2 } = currVariation;
    const { product_id } = data;
    setCurrCount(getProductCount(product_id, variation_1, variation_2));
  }, [currVariation, data]);

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
            {currPrice !== null && (
              <>
                <p className="text-gray-700 text-sm">
                  <span className="line-through	text-red-600 mr-2">
                    ${currPrevPrice}
                  </span>
                  ${currPrice} with {currQty} remaining
                </p>
                <QuantityButtonWithAddToCart
                  currPrice={currPrice}
                  product_id={product_id}
                  product_name={product_name}
                  variation_1={currVariation.variation_1}
                  variation_2={currVariation.variation_2}
                  limit={currQty}
                />
              </>
            )}
            <p className="mt-4">Tagged Categories: </p>
            {products_categories &&
              products_categories.map(
                ({ category: { category_name } }, index) => {
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
              {variations
                .filter(({ quantity }) => quantity > 0)
                .map((variation, index) => {
                  const {
                    variation_1,
                    variation_2,
                    discounted_price,
                    original_price,
                    quantity,
                  } = variation;
                  const extraProps =
                    currVariation &&
                    currVariation.variation_1 === variation_1 &&
                    currVariation.variation_2 === variation_2
                      ? "bg-red-400"
                      : "";

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setCurrPrice(discounted_price);
                        setCurrQty(quantity);
                        setCurrVariation({
                          variation_1,
                          variation_2,
                          price: discounted_price,
                          quantity,
                        });
                        setCurrPrevPrice(original_price);
                      }}
                      className={`text-center border rounded-full px-2 py-2 cursor-pointer mr-2 mb-2 col-span-1 ${extraProps}`}
                    >
                      {variation_2
                        ? `${variation_1}, ${variation_2}`
                        : variation_1}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="my-6 prose max-w-lg prose-indigo prose-lg text-gray-500 mx-auto">
          <p className="my-8 text-xl text-gray-500 leading-8">
            About the Product
          </p>
          <p className="whitespace-pre-wrap">{description}</p>
        </div>
        {product_specifications.length > 0 && (
          <div className="my-6 prose max-w-lg prose-indigo prose-lg text-gray-500 mx-auto">
            <p className="my-8 text-xl text-gray-500 leading-8">
              Product Specifications
            </p>
            <PDFViewer pdfs={product_specifications} />
          </div>
        )}
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

  return {
    props: {
      data: data["product"].length > 0 ? data["product"][0] : [],
    },
  };
}

export default Product;
