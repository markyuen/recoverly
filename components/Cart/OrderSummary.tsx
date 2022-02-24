import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import getStripe from '../../lib/get-stripejs';
import { CURRENCY } from "../../config"
import { convertCentToDollar } from "../../lib/helpers";
import { ProductBySeller } from "../../types/product";
import { CartItem } from "../../types/items";
import SpinnerWithMessage from "../Common/SpinnerWithMessage";
import { makeGraphQLQuery } from "../../lib/GraphQL";

const OrderSummary = ({ cartItemsBySeller }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const productTotal: number = cartItemsBySeller
    .reduce((acc: number, item: ProductBySeller) => { return acc + item.item_total }, 0)

  const shippingTotal: number = cartItemsBySeller
    .reduce((acc: number, item: ProductBySeller) => { return acc + item.shipping_fee }, 0)

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Create a Checkout Session.
      const lineItems = cartItemsBySeller
        .map((seller: ProductBySeller) => {
          return seller.items.map((item: CartItem) => {
            return {
              name: `${seller.company} - ${item.product_name} (${item.variation_1}${item.variation_2 ? `/${item.variation_2}` : ""
                })`,
              amount: item.discounted_price,
              currency: CURRENCY,
              quantity: item.quantity,
            }
          })
        })
        .flat();
      if (shippingTotal > 0) {
        lineItems.push({
          name: "Total Shipping Fee",
          amount: shippingTotal,
          currency: CURRENCY,
          quantity: 1,
        });
      }
      const productMetadata = cartItemsBySeller
        .reduce((acc, seller: ProductBySeller) => {
          const counts = seller.items.map((item: CartItem) => {
            return [item.variation_pair_id, item.quantity]
          })
          counts.forEach(([k, v]) => {
            acc[k] = v
          })
          return acc
        }, {})
      const response = await fetch('/api/checkout_sessions', {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          items: lineItems,
          email: user.email,
          user_id: user.sub,
          products: JSON.stringify(productMetadata),
        }),
      });
      const data = await response.json();

      if (data.statusCode === 500) {
        console.error(data.message);
        return;
      }

      // Write order to DB
      const payload = {
        user_id: user.sub,
        stripe_checkout_id: data.id,
        orders_products_data: cartItemsBySeller
          .map((seller: ProductBySeller) => {
            return seller.items.map((item: CartItem) => {
              return {
                variation_pair_id: item.variation_pair_id,
                product_amount: item.quantity,
                total_price: item.quantity * item.discounted_price,
              }
            })
          })
          .flat(),
        orders_sellers_data: cartItemsBySeller
          .map((seller: ProductBySeller) => {
            return {
              user_id: seller.user_id,
              delivery_fee: seller.shipping_fee,
            }
          }),
      };

      makeGraphQLQuery("insertNewOrder", payload)
        .then((res) => {
          console.log("Success, redirecting...");
        })
        .catch((err) => {
          console.log(err);
          return;
        });

      // Redirect to Checkout
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
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <SpinnerWithMessage label="Configuring Page" />;
  }

  return (
    <div className="flex flex-col">
      <div className="col-span-2"><p><b>Order Summary</b></p></div>
      <p>
        Product Total: ${convertCentToDollar(productTotal)}
      </p>
      <p>
        Shipping Total: {
          shippingTotal === 0 ? <b>Free!</b> : `$${convertCentToDollar(shippingTotal)}`
        }
      </p>
      <p>
        <b>
          Order Total: ${convertCentToDollar(productTotal + shippingTotal)}
        </b>
      </p>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
        Checkout with Stripe
      </button>
    </div>
  );
};

export default OrderSummary;
