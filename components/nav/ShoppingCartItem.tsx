import { Box, MenuItem } from "@chakra-ui/react";
import React from "react";
import { CartItem } from "../../types/items";
import QuantityButton from "../Product/QuantityButton";

type ShoppingCartItemProp = {
  item: CartItem;
};

const ShoppingCartItem = ({
  item: { product_name, variation },
}: ShoppingCartItemProp) => {
  return (
    <div className="px-4 py-2">
      <div>
        <p className="text-md font-bold">{product_name}</p>
      </div>
      <div className="flex justify-between">
        <div>
          {variation.map(({ variation_1, variation_2, quantity }, index) => {
            return (
              <p className="ml-2" key={index}>
                - {variation_1}/{variation_2} x {quantity}
              </p>
            );
          })}
        </div>
        <div>
          {variation.map(
            (
              { variation_1, variation_2, discounted_price, quantity },
              index
            ) => {
              return (
                <p key={index}>
                  {""}$
                  {Math.round(
                    (quantity * discounted_price + Number.EPSILON) * 100
                  ) / 100}
                </p>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
