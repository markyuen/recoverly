import React from "react";
import OrderSummary from "../components/Cart/OrderSummary";
import ShoppingCart from "../components/Cart/ShoppingCart";
import Header from "../components/Common/Header";
import ShopNav from "../components/layouts/ShopNav";
import ProtectedRoute from "../components/route/ProtectedRoute";

const Card = () => {
  const items = [
    {
      name: "Basic Tee",
      Seller: "Seller 1",
      unit_price: "100",
      quantity: 2,
      image_url:
        "http://localhost:3000/_next/image?url=https%3A%2F%2Ffakestoreapi.com%2Fimg%2F71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg&w=640&q=75",
    },
    {
      name: "Basic Tee",
      Seller: "Seller 1",
      unit_price: "100",
      quantity: 2,
      image_url:
        "http://localhost:3000/_next/image?url=https%3A%2F%2Ffakestoreapi.com%2Fimg%2F71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg&w=640&q=75",
    },
    {
      name: "Basic Tee",
      Seller: "Seller 1",
      unit_price: "100",
      quantity: 2,
      image_url:
        "http://localhost:3000/_next/image?url=https%3A%2F%2Ffakestoreapi.com%2Fimg%2F71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg&w=640&q=75",
    },
  ];

  return (
    <ProtectedRoute>
      <ShopNav>
        <div>
          <Header name="Shopping Cart" />
          <div className="grid grid-cols-6 px-5 mt-10">
            <ShoppingCart />
            <OrderSummary />
          </div>
        </div>
      </ShopNav>
    </ProtectedRoute>
  );
};

export default Card;
