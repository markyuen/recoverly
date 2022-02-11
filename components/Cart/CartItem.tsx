import React from "react";
import ProductQuantity from "../Product/ProductQuantity";

type CartItemProps = {
  product_id: number;
  variation_pair_id: number;
  variation_1: string;
  variation_2: string;
  quantity: number;
  discounted_price: number;
  limit: number;
};

const CartItem = ({
  product_id,
  variation_pair_id,
  variation_1,
  variation_2,
  quantity,
  discounted_price,
  limit,
}: CartItemProps) => {
  return (
    <div className="flex items-center justify-between w-max">
      <p className="ml-2">
        {variation_1}/{variation_2} x{quantity} (${discounted_price})
      </p>
      <ProductQuantity
        product_id={product_id}
        variation_pair_id={variation_pair_id}
        variation_1={variation_1}
        variation_2={variation_2}
        limit={limit}
      />
    </div>
  );
};

export default CartItem;
