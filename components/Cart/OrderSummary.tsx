import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import getStripe from '../../lib/get-stripejs';
import { CURRENCY } from "../../config"
import { convertCentToDollar } from "../../lib/helpers";
import { ProductSellerInformation } from "../../types/product";
import { CartItem } from "../../types/items";

const UNSET_SHIPPING_COST = -69;

const OrderSummary = ({ sellerInfo }) => {
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [shippingCost, setShippingCost] = useState(UNSET_SHIPPING_COST);

  useEffect(() => {
    if (!cartItems) return;
    const totalFee =
      sellerInfo
        .map((seller: ProductSellerInformation) => {
          const sellerProductTotal = cartItems
            .filter((item: CartItem) => item.seller_id === seller.user_id)
            .reduce((acc, item: CartItem) => {
              return acc + item.quantity * item.discounted_price;
            }, 0);
          if (sellerProductTotal >= seller.product_total_free_delivery) {
            return 0;
          } else {
            return seller.flat_shipping_fee;
          }
        })
        .reduce((acc, fee) => { return acc + fee })
    setShippingCost(totalFee);
  }, [cartItems, sellerInfo])

  const handleSubmit = async () => {
    setLoading(true);
    // Create a Checkout Session.
    const lineItems = cartItems.map((item) => {
      return {
        name: `${item.product_name} (${item.variation_1}${item.variation_2 ? `/${item.variation_2}` : ""
          })`,
        amount: item.discounted_price,
        currency: CURRENCY,
        quantity: item.quantity,
      }
    });
    if (shippingCost > 0) {
      lineItems.push({
        name: "Total Shipping Fee",
        amount: shippingCost,
        currency: CURRENCY,
        quantity: 1,
      });
    }
    const response = await fetch('/api/checkout_sessions', {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        items: lineItems,
      }),
    });
    const data = await response.json();

    if (data.statusCode === 500) {
      console.error(data.message);
      return;
    }

    // TODO: write order to DB and store the data.id as the stripe_checkout field

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: data.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
    setLoading(false);
  };

  return (
    <div className="flex flex-col">
      <div className="col-span-2"><p><b>Order Summary</b></p></div>
      <p>
        Product Total: $
        {
          cartItems &&
          convertCentToDollar(
            cartItems.reduce((acc, item) => {
              return acc + item.quantity * item.discounted_price;
            }, 0)
          )
        }
      </p>
      <p>
        Shipping Total: {
          shippingCost !== UNSET_SHIPPING_COST &&
            shippingCost === 0 ? <b>Free!</b> : `$${convertCentToDollar(shippingCost)}`
        }
      </p>
      {
        cartItems &&
        cartItems.length > 0 &&
        shippingCost !== UNSET_SHIPPING_COST &&
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
          Checkout with Stripe
        </button>
      }
    </div>
  );
};

export default OrderSummary;
