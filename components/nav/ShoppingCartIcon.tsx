import React from "react";
import { useCart } from "../../context/CartContext";
import LinkContainer from "../Common/LinkContainer";

const ShoppingCartIcon = () => {
  const { cartItems } = useCart();
  console.log(cartItems);
  return (
    <LinkContainer href="/cart">
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
    </LinkContainer>
  );
};

export default ShoppingCartIcon;
