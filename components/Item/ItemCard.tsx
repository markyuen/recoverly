import React from "react";
import Image from "next/image";
import LinkContainer from "../Common/LinkContainer";
import { generateItemSlugLink } from "../../lib/string";
import { ItemListing } from "../../types/items";
import ImageViewer from "../Common/ImageViewer";

type ItemCardProp = {
  item: ItemListing;
};

const ItemCard = ({ item }: ItemCardProp) => {
  console.log(item);
  const { product_id, product_images, product_name } = item;

  return (
    <LinkContainer href={`/product/${product_id}`}>
      <div
        id="category-item"
        className="card flex flex-col justify-center cursor-pointer px-2"
      >
        <div className="px-4 py-10 mx-auto">
          <Image
            src={product_images[0].url}
            width={300}
            height={300}
            alt={product_name}
          />
        </div>
        <p className="text-md text-gray-900 font-bold">{product_name}</p>
      </div>
    </LinkContainer>
  );
};

export default ItemCard;
