import { useUser } from "@auth0/nextjs-auth0";
import { createContext, useContext, useEffect, useReducer } from "react";
import { makeGraphQLQuery } from "../lib/GraphQL";
import { CartItem } from "../types/items";

type CartContext = {
  cartItems: CartItem[];
  dispatch: any;
  getProductCount: (variation_pair_id: number) => number;
  productExistsInCart: (variation_pair_id: number) => boolean;
  updateCartProduct: (
    user_id: string,
    variation_pair_id: number,
    quantity: number
  ) => void;
};

const CartContext = createContext<CartContext>(null!);

const SET_INIT_STATE = "SET_INIT_STATE";
export const UPDATE_ITEM_COUNT = "UPDATE_ITEM_COUNT";
export const REMOVE_ITEM_VARIATION = "REMOVE_ITEM_VARIATION";

const CartReducer = (state: CartItem[], action): CartItem[] => {
  console.log(action);
  switch (action.type) {
    case SET_INIT_STATE: {
      return action.payload;
    }

    case UPDATE_ITEM_COUNT: {
      const {
        product_id,
        variation_pair_id,
        product_name,
        variation_1,
        variation_2,
        price,
        quantity,
      } = action.payload;
      const itemIndex = state.findIndex(
        (item) => item.variation_pair_id === variation_pair_id
      );
      if (itemIndex === -1) {
        console.log("----adding Item");
        return state.concat([
          {
            product_id,
            variation_pair_id,
            product_name,
            variation_1,
            variation_2,
            quantity,
            discounted_price: price,
          },
        ]);
      } else {
        console.log("----adjusting Item Count");
        return state.map((item, index) => {
          if (index === itemIndex) {
            item.quantity = quantity;
          }
          return item;
        });
      }
    }

    case REMOVE_ITEM_VARIATION: {
      const { variation_pair_id } = action.payload;
      return state.filter((item) => item.variation_pair_id !== variation_pair_id);
    }
  }
};

export function CartWrapper({ children }) {
  const { user } = useUser();
  const [cartItems, dispatch] = useReducer(CartReducer, []);

  useEffect(() => {
    if (!user) return;
    makeGraphQLQuery("getUserCartProducts", { user_id: user.sub })
      .then((res) => {
        console.log(res);
        const payload = res.cart_product.map((item) => {
          return {
            variation_pair_id: item.variation_pair_id,
            product_id: item.variation_pair.product.product_id,
            product_name: item.variation_pair.product.product_name,
            variation_1: item.variation_pair.variation_1,
            variation_2: item.variation_pair.variation_2,
            quantity: item.quantity,
            discounted_price: item.variation_pair.discounted_price,
          }
        })
        dispatch({ type: SET_INIT_STATE, payload: payload });
      })
      .catch((err) => console.log("Error Encountered of ", err));
  }, [user])

  const productExistsInCart = (variation_pair_id: number) => {
    return cartItems.findIndex((item) => item.variation_pair_id === variation_pair_id) !== -1;
  };

  const getProductCount = (variation_pair_id: number) => {
    const idx = cartItems.findIndex((item) => item.variation_pair_id === variation_pair_id);
    console.log(cartItems)
    if (idx === -1) {
      return 0;
    }
    return cartItems[idx].quantity;
  };

  const updateCartProduct = (
    user_id: string,
    variation_pair_id: number,
    quantity: number
  ) => {
    const payload = {
      user_id: user_id,
      variation_pair_id: variation_pair_id,
      quantity: quantity,
    }
    if (productExistsInCart(variation_pair_id)) {
      makeGraphQLQuery("updateCartProduct", payload)
        .then((res) => {
          console.log(res);
          console.log("Succesfully updated product quantity");
        })
        .catch((err) => console.log(err));
    } else {
      makeGraphQLQuery("insertNewCartProduct", payload)
        .then((res) => {
          console.log(res);
          console.log("Succesfully added new cart product to database");
        })
        .catch((err) => console.log("Error Encountered of ", err));
    }
  };

  let sharedState = {
    cartItems,
    dispatch,
    getProductCount,
    productExistsInCart,
    updateCartProduct,
  };

  return (
    <CartContext.Provider value={sharedState}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
