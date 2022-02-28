import { useUser } from "@auth0/nextjs-auth0"
import React, { useEffect, useState } from "react"
import SpinnerWithMessage from "../Common/SpinnerWithMessage"
import { OrderProduct, OrderSeller, Order } from "../../types/orders"
import { makeGraphQLQuery } from "../../lib/GraphQL"
import { convertCentToDollar } from "../../lib/helpers"
import Link from "next/link"
import { orders_products_status_names, orders_sellers_status_names, order_status_enum, order_status_names } from "../../types/db_enums"
import { PLATFORM_FEE_PCT } from "../../config"

type UserOrderDisplayProps = {
  order: Order
  index: number
}

const UserOrderDisplay = ({ order, index }: UserOrderDisplayProps) => {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [orderStatus, setOrderStatus] = useState(order.order_status)

  useEffect(() => {
    if (!user) return;
  }, [user])

  const orderTotal =
    order.products.reduce((acc: number, product: OrderProduct) => {
      return acc + product.total_price
    }, 0) +
    order.sellers.reduce((acc: number, seller: OrderSeller) => {
      return acc + seller.delivery_fee
    }, 0)

  const amountToCapture =
    order.sellers.reduce((acc: number, seller: OrderSeller) => {
      return seller.order_seller_status === orders_sellers_status_names.REJECTED
        ? acc
        : acc + seller.delivery_fee
    }, 0) +
    order.products.reduce((acc: number, product: OrderProduct) => {
      return product.order_product_status === orders_products_status_names.REJECTED
        ? acc
        : acc + product.total_price
    }, 0)

  const handleCompletedUpdate = async () => {
    setLoading(true)
    // Complete the order by handling payment
    const transfers: [string, number][] = order.sellers
      .filter((seller: OrderSeller) => seller.order_seller_status !== orders_sellers_status_names.REJECTED)
      .map((seller: OrderSeller) => {
        return [
          seller.stripe_id,
          (1 - PLATFORM_FEE_PCT) * (
            seller.delivery_fee + order.products
              .filter((product: OrderProduct) => product.seller_id === user.sub)
              .reduce((acc: number, product: OrderProduct) => {
                return product.order_product_status === orders_products_status_names.REJECTED
                  ? acc
                  : acc + product.total_price
              }, 0)
          ),
        ]
      })
    const response = await fetch('/api/payment/order_payout', {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        payment_intent_id: order.stripe_payment_intent_id,
        capture_amount: amountToCapture,
        transfers: transfers,
        order_id: order.order_id,
      }),
    })
    const data = await response.json()
    if (data.statusCode === 500) {
      console.error(data.message)
    }
    // Update the order status to completed
    const payload = {
      order_id: order.order_id,
      order_status_id: order_status_enum.COMPLETED,
    }
    await makeGraphQLQuery("updateOrderStatus", payload)
      .catch((err) => console.log(err))
    setOrderStatus("COMPLETED")
    alert("Updated status! Payment will be released to merchants, and any rejected items will be refunded.")
    setLoading(false)
  }

  if (!user) {
    return (
      <SpinnerWithMessage label="Getting User" />
    )
  }

  return (
    <div className="col-span-4">
      <div className="grid space-y-4 grid-cols-1">
        <div key={index} className="border-2">
          <p>
            <b>Order ID: </b>{order.order_id}
          </p>

          <p>
            <b>Order Placed: </b>{order.created_at.toString()}
          </p>

          <p>
            <b>Shipping To: </b>{order.shipping_address}
          </p>

          <div className="flex items-center my-2">
            <p>
              <b>Order Status: </b>{orderStatus}
            </p>
            {
              orderStatus === order_status_names.PAYMENT_RECEIVED &&
              order.sellers.every((item: OrderSeller) =>
                item.order_seller_status === orders_sellers_status_names.SHIPPED ||
                item.order_seller_status === orders_sellers_status_names.REJECTED
              ) &&
              <div>
                <button
                  type="button"
                  onClick={handleCompletedUpdate}
                  disabled={loading}
                  className="cursor-pointer ml-4 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Press here to indicate that you have received all the accepted products
                </button>
              </div>
            }
          </div>

          <p>
            <b>Items: </b>
          </p>
          {
            order.sellers.map((seller: OrderSeller, index: number) => {
              return (
                <div key={index} className="px-4 py-2">
                  <div>
                    <p>
                      <b>Merchant: </b>{seller.display_name} - Shipping Total: ${convertCentToDollar(seller.delivery_fee)} - Status: {seller.order_seller_status}
                    </p>
                  </div>
                  <p>
                    <b>Products: </b>
                  </p>
                  {
                    order.products
                      .filter((product: OrderProduct) => product.seller_id === seller.user_id)
                      .map((product: OrderProduct, index: number) => {
                        return (
                          <div key={index} className="px-4 py-2">
                            <div>
                              <Link href={`/product?product_id=${product.product_id}`} passHref>
                                <p className="text-md cursor-pointer hover:text-blue-400">
                                  {
                                    `${product.product_name} ${product.variation_1}${product.variation_2 ? `/${product.variation_2}` : ""} x${product.product_amount} - Total: $${convertCentToDollar(product.total_price)} - Status: ${product.order_product_status}`
                                  }
                                </p>
                              </Link>
                            </div>
                          </div>
                        )
                      })
                  }
                </div>
              )
            })
          }

          <p>
            <b>Order Total: </b>${convertCentToDollar(orderTotal)}
          </p>

          <p>
            <b>Amount to be Captured Once Complete: ${convertCentToDollar(amountToCapture)}</b>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserOrderDisplay
