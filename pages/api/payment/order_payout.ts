import { NextApiRequest, NextApiResponse } from "next"

import Stripe from "stripe"
import { CURRENCY } from "../../../config"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-08-27",
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // First, we need to capture the Payment Intent
      await stripe.paymentIntents.capture(
        req.body.payment_intent_id,
        {
          amount_to_capture: req.body.capture_amount,
        },
      )
      // Then, we transfer from the charge to the connected accounts
      const paymentIntent: Stripe.Response<Stripe.PaymentIntent> =
        await stripe.paymentIntents.retrieve(req.body.payment_intent_id)
      // There should only ever be one associated charge?
      console.log(req.body.transfers, paymentIntent.charges.data[0].id)
      await Promise.all(
        req.body.transfers.map(([stripeId, transferAmount]) => {
          return stripe.transfers.create({
            amount: transferAmount,
            currency: CURRENCY,
            source_transaction: paymentIntent.charges.data[0].id,
            destination: stripeId,
            description: `Order ID: ${req.body.order_id}`,
            transfer_group: `ORDER-${req.body.order_id}`,
          })
        })
      )
      res.status(200).json({})
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
