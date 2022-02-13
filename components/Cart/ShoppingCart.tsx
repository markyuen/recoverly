import Link from "next/link";
import React from "react";
import { useCart } from "../../context/CartContext";
import { convertCentToDollar } from "../../lib/helpers";
import ShoppingCartItem from "../nav/ShoppingCartItem";
import CartItemVariation from "./CartItemVariation";

type Props = {
  limits: any;
};

const ShoppingCart = ({ limits }) => {
  const { cartItems } = useCart();
  return (
    <div className="col-span-4">
      <div className="grid space-y-4 grid-cols-1">
        {cartItems.map(({ product_name, variation, product_id }, index) => {
          return (
            <div key={index} className="px-4 py-2">
              <div>
                <Link
                  href={{
                    pathname: "/product",
                    query: { product_id: product_id.toString() },
                  }}
                  passHref
                >
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
                        <CartItemVariation
                          product_id={product_id}
                          product_name={product_name}
                          key={index}
                          variation_1={variation_1}
                          variation_2={variation_2}
                          quantity={quantity}
                          discounted_price={discounted_price}
                          limit={limits}
                        />
                      );
                    }
                  )}
                </div>
              </div>
              <p>
                Total:${" "}
                {convertCentToDollar(
                  variation.reduce((acc, { quantity, discounted_price }) => {
                    return acc + quantity * discounted_price;
                  }, 0)
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShoppingCart;
