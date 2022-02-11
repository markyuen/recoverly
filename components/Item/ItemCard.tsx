import React from "react";
import Image from "next/image";
import LinkContainer from "../Common/LinkContainer";
import { generateItemSlugLink } from "../../lib/string";
import { ItemListing } from "../../types/items";
import ImageViewer from "../Common/ImageViewer";
import { Tag } from "@chakra-ui/react";

type ItemCardProp = {
  item: ItemListing;
};

const ItemCard = ({ item }: ItemCardProp) => {
  const { product_id, product_images, product_name, variations } = item;

  const calculateDiscount = (original_price, discounted_price) => {
    if (original_price == discounted_price) {
      return 0;
    }
    return parseFloat(
      ((100 * (original_price - discounted_price)) / original_price).toFixed(2)
    );
  };

  const getMaxDiscountPercentage = () => {
    const maxDiscount = variations.reduce(
      (acc, item) =>
        Math.max(
          acc,
          calculateDiscount(item.original_price, item.discounted_price)
        ),
      0
    );
    return Math.round(maxDiscount - (maxDiscount % 5));
  };

  return (
    <LinkContainer
      href={{
        pathname: "/product",
        query: { product_id: product_id.toString() },
      }}
    >
      <div
        id="category-item"
        className="card flex flex-col justify-center cursor-pointer px-2"
      >
        {/* <Image
          src={product_images[0].url}
          width={300}
          height={300}
          alt={"Fake news"}
        /> */}
        <p className="text-md text-gray-900 font-bold">{product_name}</p>
        <p>
          $
          {variations.reduce(
            (acc, item) => Math.min(acc, item.discounted_price),
            Number.POSITIVE_INFINITY
          )}
          - $
          {variations.reduce(
            (acc, item) => Math.max(acc, item.discounted_price),
            0
          )}{" "}
          <Tag
            style={{
              backgroundColor: "#002570",
              color: "white",
            }}
          >
            {getMaxDiscountPercentage()}% Off
          </Tag>
        </p>
      </div>
    </LinkContainer>
  );
};

export default ItemCard;
