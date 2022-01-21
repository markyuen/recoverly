import { createContext, useContext, useState } from "react";
import { ItemProp, CartItem } from "../types/items";

type CartContext = {
  cartItems: CartItem[];
  addToCart: (item: ItemProp, quantity: number) => void;
  removeFromCart: (id: number) => void;
  getCurrentCount: (id: number) => number;
};

const CartContext = createContext<CartContext>(null!);

export function CartWrapper({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [existingCartIds, setExistingCardIds] = useState({});

  const addToCart = (item, quantity) => {
    //  Exists in Cart
    if (existingCartIds[item.id]) {
      setCartItems((cartItems) =>
        cartItems.map((prevItem) => {
          if (prevItem.id === item.id) {
            return { ...item, quantity: prevItem.quantity + quantity };
          }
          return item;
        })
      );
    } else {
      console.log({ ...item, quantity: 1 });
      setCartItems([...cartItems, { ...item, quantity: 1 }]);

      const existingIds = { ...existingCartIds };
      existingIds[item.id] = true;
      setExistingCardIds(existingIds);
    }
  };

  const removeFromCart = (item) => {
    const currQuantity = cartItems.find(
      (cartItem) => cartItem.id === item.id
    ).quantity;
    if (currQuantity == 1) {
      delete existingCartIds[item.id];
    }
    setCartItems((cartItems) =>
      cartItems.filter((cartItem) => cartItem.id !== item.id)
    );
  };

  const getCurrentCount = (id: number) => {
    if (existingCartIds[id]) {
      return cartItems.find((cartItem) => cartItem.id === id).quantity;
    }
    return 0;
  };

  let sharedState = {
    cartItems,
    addToCart,
    removeFromCart,
    getCurrentCount,
  };

  return (
    <CartContext.Provider value={sharedState}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
