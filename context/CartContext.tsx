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

const CartReducer = (state: CartItem[], action): CartItem[] => {
  switch (action.type) {
    case UPDATE_ITEM_COUNT: {
      console.log(action);
      const {
        product_id,
        product_name,
        variation_1,
        variation_2,
        price,
        quantity_to_add,
      } = action.payload;

      const itemIndex = state.findIndex(
        (item) => item.product_id === product_id
      );

      if (itemIndex === -1) {
        console.log("----adding Item");
        return state.concat([
          {
            product_id,
            product_name,
            variation: [
              {
                variation_1,
                variation_2,
                quantity: quantity_to_add,
                discounted_price: price,
              },
            ],
          },
        ]);
      }

      const variationIndex = state[itemIndex].variation.findIndex((item) => {
        return (
          item.variation_1 === variation_1 && item.variation_2 === variation_2
        );
      });

      if (variationIndex === -1) {
        return state.map((item) => {
          if (item.product_id !== product_id) {
            return item;
          }
          return {
            ...item,
            variation: [
              ...item.variation,
              {
                variation_1,
                variation_2,
                quantity: quantity_to_add,
                discounted_price: price,
              },
            ],
          };
        });
      }

      return state.map((item, index) => {
        if (index !== itemIndex) {
          return item;
        }
        return {
          ...state[itemIndex],
          variation: state[itemIndex].variation.map((variation, index) => {
            if (index !== variationIndex) {
              return variation;
            }
            return {
              ...variation,
              quantity: variation.quantity + quantity_to_add,
            };
          }),
        };
      });
    }

    case REMOVE_ITEM_VARIATION: {
      const { product_id, variation_1, variation_2 } = action.payload;

      return state
        .map((item) => {
          if (item.product_id !== product_id) {
            return item;
          }

          return {
            ...item,
            variation: item.variation.filter(
              (item) =>
                item.variation_1 !== variation_1 &&
                (!item.variation_2 || item.variation_2 !== variation_2)
            ),
          };
        })
        .filter((item) => item.variation.length > 0);
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
