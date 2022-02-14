import useSWR from "swr";
import OrderSummary from "../components/Cart/OrderSummary";
import ShoppingCart from "../components/Cart/ShoppingCart";
import Header from "../components/Common/Header";
import SpinnerWithMessage from "../components/Common/SpinnerWithMessage";
import ShopNav from "../components/layouts/ShopNav";
import ProtectedRoute from "../components/route/ProtectedRoute";
import { useCart } from "../context/CartContext";
import { fetcherWithBody } from "../lib/swr";

const Cart = () => {
  const { cartItems } = useCart();

  if (!cartItems) {
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

export default Cart;
