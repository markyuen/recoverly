import Link from "next/link";
import React from "react";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";

const ShoppingCart = ({ limits }) => {
  const { cartItems } = useCart();
  return (
    <div className="col-span-4">
      <div className="grid space-y-4 grid-cols-1">
        {
          cartItems.map((item, index) => {
            return (
              <div key={index} className="px-4 py-2">
                <div>
                  <Link href={`/product/${item.product_id}`} passHref>
                    <p className="text-md font-bold cursor-pointer hover:text-blue-400">
                      {item.product_name}
                    </p>
                  </Link>
                </div>
                <div className="flex justify-between">
                  <div>
                    <CartItem
                      product_id={item.product_id}
                      variation_pair_id={item.variation_pair_id}
                      variation_1={item.variation_1}
                      variation_2={item.variation_2}
                      quantity={item.quantity}
                      discounted_price={item.discounted_price}
                      limit={limits}
                    />
                  </div>
                </div>
                <p>
                  Total: ${item.quantity * item.discounted_price}
                </p>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default ShoppingCart;
