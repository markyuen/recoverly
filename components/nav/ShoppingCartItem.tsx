import React from "react";
import { Menu } from "@headlessui/react";
import { CartItem } from "../../types/items";

type ShoppingCartItemProp = {
  item: CartItem;
};

const ShoppingCartItem = ({ item }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <>
          <p>{item.title}</p>
          <p>{item.quantity}</p>
        </>
      )}
    </Menu.Item>
  );
};

export default ShoppingCartItem;
