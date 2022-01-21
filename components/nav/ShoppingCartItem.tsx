import { Box, MenuItem } from "@chakra-ui/react";
import React from "react";
import { CartItem } from "../../types/items";
import QuantityButton from "../Product/QuantityButton";

type ShoppingCartItemProp = {
  item: CartItem;
};

const ShoppingCartItem = ({ item }) => {
  return (
    <MenuItem as={Box} _hover={{}} _focus={{}} _active={{}}>
      <div className="flex items-start my-2">
        <div className="flex flex-col items-start pr-10">
          <span className="text-md font-bold">{item.title}</span>

          <p className="mb-2">
            ${" "}
            {Math.round((item.quantity * item.price + Number.EPSILON) * 100) /
              100}
          </p>
        </div>
        <div className="">
          <QuantityButton size={"small"} data={item} />
        </div>
      </div>
    </MenuItem>
  );
};

export default ShoppingCartItem;
