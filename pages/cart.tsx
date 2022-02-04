import React, { useState } from "react";
import useSWR from "swr";
import OrderSummary from "../components/Cart/OrderSummary";
import ShoppingCart from "../components/Cart/ShoppingCart";
import Header from "../components/Common/Header";
import SpinnerWithMessage from "../components/Common/SpinnerWithMessage";
import ShopNav from "../components/layouts/ShopNav";
import ProtectedRoute from "../components/route/ProtectedRoute";
import { useCart } from "../context/CartContext";
import { fetcherWithBody } from "../lib/swr";
import getLimits from "../queries/getLimits";

const Cart = () => {
  const { cartItems } = useCart();
  const { data, error } = useSWR(
    cartItems.length > 0
      ? [
          "/api/graphql/getLimits",
          {
            query: getLimits,
            variables: {
              product_ids: cartItems.map((item) => item.product_id),
            },
          },
        ]
      : null,
    fetcherWithBody
  );

  if (!data && cartItems.length > 0) {
    return (
      <ProtectedRoute>
        <ShopNav>
          <div>
            <Header name="Shopping Cart" />
            <SpinnerWithMessage label="Updating Order Information" />
          </div>
        </ShopNav>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <ShopNav>
          <div>
            <Header name="Shopping Cart" />
            <p>Error encountered. Please contact help desk for support.</p>
          </div>
        </ShopNav>
      </ProtectedRoute>
    );
  }

  console.log(cartItems);

  return (
    <ProtectedRoute>
      <ShopNav>
        <div>
          <Header name="Shopping Cart" />
          <div className="grid grid-cols-6 px-5 mt-10">
            <ShoppingCart limits={data ? data.product : []} />
            <OrderSummary />
          </div>
        </div>
      </ShopNav>
    </ProtectedRoute>
  );
};

export default Cart;
