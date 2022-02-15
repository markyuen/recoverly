import { useEffect, useState } from "react";
import useSWR from "swr";
import OrderSummary from "../components/Cart/OrderSummary";
import ShoppingCart from "../components/Cart/ShoppingCart";
import Header from "../components/Common/Header";
import SpinnerWithMessage from "../components/Common/SpinnerWithMessage";
import ShopNav from "../components/layouts/ShopNav";
import ProtectedRoute from "../components/route/ProtectedRoute";
import { useCart } from "../context/CartContext";
import { fetcherWithBody } from "../lib/swr";
import { getSellerFees } from "../queries/getSellerFees";
import { ProductSellerInformation } from "../types/product";

const Cart = () => {
  const { cartItems } = useCart();
  const [mounted, setMounted] = useState(false);

  const { data, error } = useSWR(
    !mounted ? null :
      [...new Set(cartItems.map((item) => { return item.seller_id }))]
        .map((seller_id) => {
          return {
            url: "/api/graphql/getSellerFees",
            body: {
              query: getSellerFees,
              variables: {
                user_id: seller_id,
              },
            },
          }
        }),
    fetcherWithBody,
  );

  useEffect(() => {
    if (!cartItems) return;
    setMounted(true);
  }, [cartItems])

  if (!data) {
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

  const sellerInfo: ProductSellerInformation[] = data.map((item) => {
    return {
      ...item.seller_by_pk
    }
  });

  return (
    <ProtectedRoute>
      <ShopNav>
        <div>
          <Header name="Shopping Cart" />
          <div className="grid grid-cols-6 px-5 mt-10">
            <ShoppingCart sellerInfo={sellerInfo} />
            <OrderSummary sellerInfo={sellerInfo} />
          </div>
        </div>
      </ShopNav>
    </ProtectedRoute>
  );
};

export default Cart;
