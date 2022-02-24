import Link from "next/link";
import React from "react";
import { convertCentToDollar } from "../../lib/helpers";
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
        <Link href={`/product?product_id=${item.product_id}`} passHref>
          <p className="text-md font-bold cursor-pointer hover:text-blue-400">
            {item.product_name}
          </p>
        </Link>
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
              ${convertCentToDollar(item.quantity * item.discounted_price)}
            </p>
          }
        </div>
      </div>
    </div>
  );
};

export default CartIconItemDisplay;
