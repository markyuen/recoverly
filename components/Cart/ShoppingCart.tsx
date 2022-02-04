import Link from "next/link";
import React from "react";
import { useCart } from "../../context/CartContext";
import ShoppingCartItem from "../nav/ShoppingCartItem";

const ShoppingCart = () => {
  const { cartItems } = useCart();
  return (
    <div className="col-span-4">
      <div className="grid space-y-4 grid-cols-1">
        {cartItems.map(({ product_name, variation, product_id }, index) => {
          return (
            <div key={index} className="px-4 py-2">
              <div>
                <Link href={`/product/${product_id}`} passHref>
                  <p className="text-md font-bold cursor-pointer hover:text-blue-400">
                    {product_name}
                  </p>
                </Link>
              </div>
              <div className="flex justify-between">
                <div>
                  {variation.map(
                    (
                      { variation_1, variation_2, quantity, discounted_price },
                      index
                    ) => {
                      return (
                        <p className="ml-2" key={index}>
                          - {variation_1}/{variation_2} x {quantity} ( {""}$
                          {Math.round(
                            (quantity * discounted_price + Number.EPSILON) * 100
                          ) / 100}
                          )
                        </p>
                      );
                    }
                  )}
                </div>
              </div>
              <p>
                Total:${" "}
                {variation.reduce((acc, { quantity, discounted_price }) => {
                  return acc + quantity * discounted_price;
                }, 0)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShoppingCart;
