import { buffer } from 'micro'
import Cors from 'micro-cors'
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { serverSideHasura } from '../../../lib/GraphQL'
import { order_status_enum } from '../../../types/db_enums'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
})

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
})

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err)
      console.log(`❌ Error message: ${errorMessage}`)
      res.status(400).send(`Webhook Error: ${errorMessage}`)
      return
    }

    // Successfully constructed event.
    console.log('✅ Success:', event.id)

    // Cast event data to Stripe object.
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      const address = `${session.shipping.name} - ${session.shipping.address.line1}${session.shipping.address.line2 ? `, ${session.shipping.address.line2}` : ""} - ${session.shipping.address.country} ${session.shipping.address.postal_code}`;
      // TODO: handle errors?
      // Get product counts
      const productData = JSON.parse(session.metadata.products) as Object
      const updatedProductCounts = await Promise.all(
        Object.entries(productData).map(async ([k, v]) => {
          const id = parseInt(k)
          try {
            const res = await serverSideHasura("getProductVariation", { variation_pair_id: id })
            return [k, res.variation_pair_by_pk.quantity - v]
          } catch (err) {
            new Error("Error fetching product quantity.")
          }
        })
      )
      // Update product counts
      updatedProductCounts.forEach(([k, v]) => {
        serverSideHasura("updateProductCount", {
          variation_pair_id: k,
          quantity: v,
        })
      })
      // Update order status to paid, remove items from user cart
      serverSideHasura("updateUserOrderStatus", {
        stripe_checkout_id: session.id,
        order_status_id: order_status_enum.PAYMENT_RECEIVED,
        shipping_address: address,
        user_id: session.metadata.user_id,
        stripe_payment_intent_id: session.payment_intent,
      })
    } else if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      // TODO: update status of order by checkout session id returned
      // Notify sellers that they have an order
      console.log(`💰 PaymentIntent status: ${paymentIntent.status}`)
    } else if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      // TODO: update status of order, inform customer that the
      // payment failed
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      )
    } else {
      console.warn(`🤷 Unhandled event type: ${event.type}`)
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default cors(webhookHandler as any)
