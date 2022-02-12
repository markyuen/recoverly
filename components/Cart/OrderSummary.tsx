import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import getStripe from '../../lib/get-stripejs';
import { CURRENCY } from "../../config"

const OrderSummary = () => {
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    // Create a Checkout Session.
    const lineItems = cartItems.map((item) => {
      return {
        name: `${item.product_name} (${item.variation_1}${item.variation_2 ? `/${item.variation_2}` : ""
          })`,
        amount: item.discounted_price,
        currency: CURRENCY,
        quantity: item.quantity,
      }
    })
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
      console.error(data.message)
      return
    }

    // TODO: write order to DB and store the data.id as the stripe_checkout field

    // Redirect to Checkout.
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: data.id,
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message)
    setLoading(false)
  }

  return (
    <div className="flex flex-col">
      <div className="col-span-2"><p><b>Order Summary</b></p></div>
      <p>
        Total: $
        {
          cartItems &&
          cartItems.reduce((acc, item) => {
            return acc + item.quantity * item.discounted_price;
          }, 0)
        }
      </p>
      {
        cartItems && cartItems.length > 0 &&
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
