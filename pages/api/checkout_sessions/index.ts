import { NextApiRequest, NextApiResponse } from "next"

import { MIN_AMOUNT, MAX_AMOUNT } from "../../../config"

import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-08-27",
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const items = req.body.items;
    const amount: number = items.reduce((acc: number, item) => {
      return acc + item.quantity * item.amount;
    }, 0)
    try {
      // Validate the amount that was passed from the client.
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error("Invalid amount.")
      }
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        mode: "payment",
        payment_method_types: ["card"],
        line_items: items,
        customer_creation: "always", // KIV, can potentially tie customer to user in future
        customer_email: req.body.email,
        success_url: `${req.headers.origin}/account/orders`,
        cancel_url: `${req.headers.origin}/cart`,
        shipping_address_collection: {
          allowed_countries: ["SG"]
        },
        payment_intent_data: {
          capture_method: "manual",
        },
        metadata: {
          user_id: req.body.user_id,
          products: req.body.products,
        },
      }
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params)

      res.status(200).json(checkoutSession)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error"
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
