import React from "react";
import { useCart } from "../../context/CartContext";

const OrderSummary = () => {
  const { cartItems } = useCart();
  return (
    <div className="flex flex-col">
      <div className="col-span-2">Order Summary</div>
      <p>
        Total :${" "}
        {cartItems &&
          cartItems.reduce((acc, { variation }) => {
            return (
              acc +
              variation.reduce((acc, { quantity, discounted_price }) => {
                return acc + quantity * discounted_price;
              }, 0)
            );
          }, 0)}
      </p>
      <button className="mt-4 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
        Checkout with Stripe
      </button>
    </div>
  );
};

export default OrderSummary;
