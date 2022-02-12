import React from "react";
import { CartItem } from "../../types/items";

type CartIconItemDisplayProps = {
  item: CartItem;
};

const CartIconItemDisplay = ({
  item,
}: CartIconItemDisplayProps) => {
  return (
    item &&
    <div className="px-4 py-2">
      <div>
        <p className="text-md font-bold">{item.product_name}</p>
      </div>
      <div className="flex justify-between">
        <div>
          {
            <p className="ml-2">
              - {item.variation_1}{item.variation_2 ? `/${item.variation_2}` : ""
              } x{item.quantity}
            </p>
          }
        </div>
        <div>
          {
            <p>
              ${item.quantity * item.discounted_price}
            </p>
          }
        </div>
      </div>
    </div>
  );
};

export default CartIconItemDisplay;
