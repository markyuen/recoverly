import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Box,
} from "@chakra-ui/react";
import { useCart } from "../../context/CartContext";
import ShoppingCartItem from "./ShoppingCartItem";
import LinkContainer from "../Common/LinkContainer";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function ShoppingCartIcon() {
  const { cartItems } = useCart();

  return (
    <Menu placement="bottom-end" closeOnSelect={false}>
      <MenuButton as={Box}>
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartItems.length > 0 ? (
            <p className="-ml-2 -mt-1 text-blue-5 border-black-200 ">
              {cartItems.length}
            </p>
          ) : null}
        </div>
      </MenuButton>
      <MenuList>
        {cartItems.map((item, index) => {
          return <ShoppingCartItem key={index} item={item} />;
        })}
        {cartItems.length > 0 ? null : (
          <p className="py-4 px-4">No Items in the Cart at the moment</p>
        )}
        {cartItems.length == 0 ? null : (
          <LinkContainer href="/cart">
            <div className="flex items-end w-full px-2 cursor-pointer">
              <p className="text-extrabold text-md ">Checkout Items</p>
            </div>
          </LinkContainer>
        )}
      </MenuList>
    </Menu>
  );
}
