import { useUser } from "@auth0/nextjs-auth0";
import { Item } from "framer-motion/types/components/Reorder/Item";
import { createContext, useContext, useReducer, useState } from "react";
import { ItemProp, CartItem } from "../types/items";

type CartContext = {
  cartItems: CartItem[];
  dispatch: any;
  getProductCount: (
    product_id: number,
    variation_1: string,
    variation_2: string
  ) => number;
};

const CartContext = createContext<CartContext>(null!);

export const UPDATE_ITEM_COUNT = "UPDATE_ITEM_COUNT";
export const REMOVE_ITEM_VARIATION = "REMOVE_ITEM_VARIATION";

const CartReducer = (state: CartItem[], action) => {
  switch (action.type) {
    case UPDATE_ITEM_COUNT: {
      const {
        product_id,
        product_name,
        variation_1,
        variation_2,
        price,
        quantity,
      } = action.payload;

      if (state.filter((item) => item.product_id === product_id).length === 0) {
        return [
          ...state,
          {
            product_id,
            product_name,
            variation: [
              {
                variation_1,
                variation_2,
                quantity: 1,
                discounted_price: price,
              },
            ],
          },
        ];
      }

      const stateWithoutItem = state.filter(
        (item) => item.product_id !== product_id
      );
      const item = state.filter((item) => item.product_id === product_id)[0];

      // Product Exists, check if variation exists
      if (
        item.variation.filter(
          (item) =>
            item.variation_1 === variation_1 && item.variation_2 === variation_2
        ).length == 1
      ) {
        const variation = item.variation.filter(
          (item) =>
            item.variation_1 === variation_1 && item.variation_2 === variation_2
        )[0];

        variation.quantity += quantity;

        return [...stateWithoutItem, item];
      } else {
        const itemVariations = item.variation.concat([
          {
            variation_1,
            variation_2,
            quantity: 1,
            discounted_price: price,
          },
        ]);
        item["variation"] = itemVariations;
        return [...stateWithoutItem, item];
      }
    }
    case REMOVE_ITEM_VARIATION: {
      const { product_id, variation_1, variation_2 } = action.payload;

      const stateWithoutItem = state.filter(
        (item) => item.product_id !== product_id
      );
      const item = state.filter((item) => item.product_id === product_id)[0];
      item["variation"] = item.variation.filter(
        (variation) =>
          variation.variation_1 !== variation_1 &&
          variation.variation_2 !== variation_2
      );

      if (item.variation.length === 0) {
        return stateWithoutItem;
      }

      return [...stateWithoutItem, item];
    }
  }
};

export function CartWrapper({ children }) {
  const [cartItems, dispatch] = useReducer(CartReducer, []);

  const getProductCount = (product_id, variation_1, variation_2) => {
    if (
      cartItems.filter((item) => item.product_id === product_id).length == 0
    ) {
      return 0;
    }
    console.log(`Getting Count for ${variation_1}/${variation_2}`);
    if (
      cartItems
        .filter((item) => item.product_id === product_id)[0]
        .variation.filter(
          (item) =>
            item.variation_1 === variation_1 && item.variation_2 === variation_2
        ).length == 0
    ) {
      return 0;
    }

    return cartItems
      .filter((item) => item.product_id === product_id)[0]
      .variation.filter(
        (item) =>
          item.variation_1 === variation_1 && item.variation_2 === variation_2
      )[0].quantity;
  };

  let sharedState = {
    cartItems,
    dispatch,
    getProductCount,
  };

  return (
    <CartContext.Provider value={sharedState}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
