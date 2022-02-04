import React from "react";
import QuantityButton from "../Product/QuantityButton";

type product_info = {
  product_id: number;
  variations: {
    variation_1: string;
    variation_2: string;
    quantity: number;
  }[];
};

type CartItemVariationProps = {
  product_id: number;
  variation_1: string;
  variation_2: string;
  quantity: number;
  discounted_price: number;
  product_name: string;
  limit: product_info[];
};

const CartItemVariation = ({
  product_id,
  variation_1,
  variation_2,
  quantity,
  discounted_price,
  product_name,
  limit,
}: CartItemVariationProps) => {
  const itemQuantityLimit = limit
    .filter((item) => item.product_id === product_id)[0]
    .variations.filter(
      (item) =>
        item.variation_1 === variation_1 && item.variation_2 === variation_2
    )[0].quantity;

  return (
    <div className="flex items-center justify-between w-max">
      <p className="ml-2">
        - {variation_1}/{variation_2} x {quantity} ( {""}$
        {Math.round((quantity * discounted_price + Number.EPSILON) * 100) / 100}
        )
      </p>
      <QuantityButton
        product_id={product_id}
        variation_1={variation_1}
        variation_2={variation_2}
        product_name={product_name}
        currPrice={discounted_price}
        limit={itemQuantityLimit}
      />
    </div>
  );
};

export default CartItemVariation;
