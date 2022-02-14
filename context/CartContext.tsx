import { useUser } from "@auth0/nextjs-auth0";
import { createContext, useContext, useEffect, useReducer } from "react";
import { makeGraphQLQuery } from "../lib/GraphQL";
import { CartItem } from "../types/items";

type CartContext = {
  cartItems: CartItem[];
  dispatch: (any) => void;
  productExistsInCart: (variation_pair_id: number) => boolean;
  getProductCount: (variation_pair_id: number) => number;
  updateCartProduct: (
    user_id: string,
    variation_pair_id: number,
    quantity: number
  ) => Promise<void>;
};

const CartContext = createContext<CartContext>(null!);

const SET_INIT_STATE = "SET_INIT_STATE";
export const UPDATE_ITEM_COUNT = "UPDATE_ITEM_COUNT";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const REMOVE_ID = -69;

const CartReducer = (state: CartItem[], action): CartItem[] => {
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
        quantity,
        price,
        limit,
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
            limit,
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

    case REMOVE_ITEM: {
      const variation_pair_id = action.payload;
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
            limit: item.variation_pair.quantity,
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
    if (idx === -1) {
      return 0;
    }
    return cartItems[idx].quantity;
  };

  const updateCartProduct = async (
    user_id: string,
    variation_pair_id: number,
    quantity: number
  ) => {
    if (quantity === REMOVE_ID) {
      await makeGraphQLQuery("deleteCartProduct", {
        user_id: user_id,
        variation_pair_id: variation_pair_id,
      })
        .then((res) => {
          console.log(res);
          console.log("Succesfully removed product");
        })
        .catch((err) => console.log(err));
      return;
    }
    // ^^ Exit early if removing item
    const payload = {
      user_id: user_id,
      variation_pair_id: variation_pair_id,
      quantity: quantity,
    }
    if (productExistsInCart(variation_pair_id)) {
      await makeGraphQLQuery("updateCartProduct", payload)
        .then((res) => {
          console.log(res);
          console.log("Succesfully updated product quantity");
        })
        .catch((err) => console.log(err));
    } else {
      await makeGraphQLQuery("insertNewCartProduct", payload)
        .then((res) => {
          console.log(res);
          console.log("Succesfully added new cart product to database");
        })
        .catch((err) => console.log("Error Encountered of ", err));
    }
    return;
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
