import {
  Menu,
  MenuButton,
  MenuList,
  Box,
} from "@chakra-ui/react";
import { useCart } from "../../context/CartContext";
import CartIconItemDisplay from "./CartIconItemDisplay";
import LinkContainer from "../Common/LinkContainer";

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
          {
            cartItems.length > 0 &&
            <p className="-ml-2 -mt-1 text-blue-5 border-black-200 ">
              {cartItems.length}
            </p>
          }
        </div>
      </MenuButton>
      <MenuList>
        {
          cartItems.length === 0 &&
          <p className="py-4 px-4">No Items in the Cart at the moment</p>
        }
        {
          cartItems.length > 0 &&
          <p className="ml-2 font-extrabold text-lg">Your Current Items</p>
        }
        {
          cartItems.map((item, index) => {
            return <CartIconItemDisplay key={index} item={item} />;
          })
        }
        {
          cartItems.length > 0 &&
          <LinkContainer href="/cart">
            <div className="ml-4 mt-4 mb-4 mr-4 flex flex-row-reverse">
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View Cart
              </button>
            </div>
          </LinkContainer>
        }
      </MenuList>
    </Menu>
  );
}
