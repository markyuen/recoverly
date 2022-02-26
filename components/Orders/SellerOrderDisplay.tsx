import { useUser } from "@auth0/nextjs-auth0";
import React, { useEffect, useState } from "react";
import SpinnerWithMessage from "../Common/SpinnerWithMessage";
import { OrderProduct, Order } from "../../types/orders";
import { convertCentToDollar } from "../../lib/helpers";
import ProductStatus from "./ProductStatus";
import { makeGraphQLQuery } from "../../lib/GraphQL";
import { orders_products_status_names, orders_sellers_status_enum, orders_sellers_status_names } from "../../types/db_enums";
import { PLATFORM_FEE_PCT } from "../../config";

type SellerOrderDisplayProps = {
  order: Order;
  index: number;
}

const SellerOrderDisplay = ({ order, index }: SellerOrderDisplayProps) => {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [merchantStatus, setMerchantStatus] = useState(order.sellers[0].order_seller_status)

  useEffect(() => {
    if (!user) return;
  }, [user])

  if (!user) {
    return (
      <SpinnerWithMessage label="Getting User" />
    );
  }

  const handleShippingUpdate = async () => {
    setLoading(true)
    const payload = {
      order_id: order.order_id,
      user_id: user.sub,
      orders_sellers_status_id: orders_sellers_status_enum.SHIPPED,
    }
    await makeGraphQLQuery("updateOrderSellerStatus", payload)
      .catch((err) => console.log(err))
    setMerchantStatus(orders_sellers_status_names.SHIPPED)
    alert("Updated status!")
    setLoading(false)
  }

  const shippingTotal = order.sellers[0].delivery_fee

  const orderTotal = shippingTotal +
    order.products.reduce((acc: number, product: OrderProduct) => {
      return acc + product.total_price
    }, 0)

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

          <p>
            <b>Order Status: </b>{order.order_status}
          </p>

          <div className="flex items-center my-2">
            <p>
              <b>Merchant Status: </b>{merchantStatus}
            </p>
            {
              merchantStatus === "ACCEPTED" &&
              <div>
                <button
                  type="button"
                  onClick={handleShippingUpdate}
                  disabled={loading}
                  className="cursor-pointer ml-4 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Press here to indicate that you have shipped out the accepted products
                </button>
              </div>
            }
          </div>

          <p>
            <b>Products: </b>
          </p>
          {
            order.products.map((product: OrderProduct, index: number) => {
              return <ProductStatus
                key={index}
                orderId={order.order_id}
                product={product}
                index={index}
                setMerchantStatus={setMerchantStatus}
              />
            })
          }

          <p>
            <b>Shipping Total: </b>${convertCentToDollar(order.sellers[0].delivery_fee)}
          </p>

          <p>
            <b>Order Total: </b>${convertCentToDollar(orderTotal)}
          </p>

          <p>
            <b>Amount to be Transfered Once Complete (after platform fees): ${
              convertCentToDollar(
                merchantStatus === orders_sellers_status_names.REJECTED
                  ? 0
                  : (
                    shippingTotal +
                    order.products.reduce((acc: number, product: OrderProduct) => {
                      return product.order_product_status === orders_products_status_names.REJECTED
                        ? acc
                        : acc + product.total_price * (1 - PLATFORM_FEE_PCT)
                    }, 0)
                  )
              )
            }</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerOrderDisplay
