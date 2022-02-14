import React from "react";
import ProductQuantity from "../Product/ProductQuantity";
import { CartItem } from "../../types/items";
import { convertCentToDollar } from "../../lib/helpers";

const CartItemDisplay = ({
  product_id,
  variation_pair_id,
  product_name,
  variation_1,
  variation_2,
  quantity,
  discounted_price,
  limit,
}: CartItem) => {
  return (
    <div className="flex items-center justify-between w-max">
      <p className="ml-2">
        {variation_1}{variation_2 ? `/${variation_2}` : ""
        } x{quantity} (${convertCentToDollar(discounted_price)})
      </p>
      <ProductQuantity
        product_id={product_id}
        variation_pair_id={variation_pair_id}
        product_name={product_name}
        variation_1={variation_1}
        variation_2={variation_2}
        price={discounted_price}
        limit={limit}
      />
    </div>
  );
};

export default CartItemDisplay;
