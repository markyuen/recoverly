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
import { CartItem } from "../types/items";
import { ProductBySeller, ProductSellerInformation } from "../types/product";

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

  const cartItemsBySeller: ProductBySeller[] = data
    .map((item) => { return { ...item.seller_by_pk } })
    .map((seller: ProductSellerInformation) => {
      const sellerProducts = cartItems
        .filter((item: CartItem) => item.seller_id === seller.user_id)
      const sellerProductTotal = sellerProducts
        .reduce((acc, item: CartItem) => {
          return acc + item.quantity * item.discounted_price;
        }, 0);
      const shipping_fee =
        sellerProductTotal >= seller.product_total_free_delivery
          ? 0
          : seller.flat_shipping_fee
      return {
        user_id: seller.user_id,
        display_name: seller.display_name,
        items: [...sellerProducts],
        item_total: sellerProductTotal,
        shipping_fee,
      }
    });

    console.log(cartItemsBySeller)

  return (
    <ProtectedRoute>
      <ShopNav>
        <div>
          <Header name="Shopping Cart" />
          <div className="grid grid-cols-6 px-5 mt-10">
            <ShoppingCart cartItemsBySeller={cartItemsBySeller} />
            <OrderSummary cartItemsBySeller={cartItemsBySeller} />
          </div>
        </div>
      </ShopNav>
    </ProtectedRoute>
  );
};

export default Cart;
