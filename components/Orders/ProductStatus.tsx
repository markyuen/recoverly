import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useEffect, useState } from "react";
import { makeGraphQLQuery } from "../../lib/GraphQL";
import { convertCentToDollar } from "../../lib/helpers";
import { orders_products_status_enum, orders_products_status_names, orders_sellers_status_enum, orders_sellers_status_names, order_status_enum } from "../../types/db_enums";
import { OrderProduct } from "../../types/orders";
import SpinnerWithMessage from "../Common/SpinnerWithMessage";

type ProductStatusProps = {
  orderId: number;
  paymentIntentId: string;
  product: OrderProduct;
  index: number;
  setMerchantStatus: React.Dispatch<React.SetStateAction<string>>;
}

const ACCEPT = "ACCEPT"
const REJECT = "REJECT"

const ProductStatus = ({ orderId, paymentIntentId, product, index, setMerchantStatus }: ProductStatusProps) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) return
  }, [user])

  // TODO: convert all mutations into single query?
  const handleUpdate = async (updateType: string) => {
    setLoading(true)

    // Update this product's status
    const payload = {
      order_id: orderId,
      variation_pair_id: product.variation_pair_id,
      orders_products_status_id: updateType === ACCEPT
        ? orders_products_status_enum.ACCEPTED
        : orders_products_status_enum.REJECTED,
    }
    await makeGraphQLQuery("updateOrderProductStatus", payload)
      .catch((err) => console.log(err))
    if (updateType === REJECT) {
      // Update product stock
      const res = await makeGraphQLQuery("getProductVariation", {
        variation_pair_id: product.variation_pair_id
      })
      const payload = {
        variation_pair_id: product.variation_pair_id,
        quantity: res.variation_pair_by_pk.quantity + product.product_amount,
      }
      await makeGraphQLQuery("updateProductCount", payload)
        .catch((err) => console.log(err))
    }
    // Update display
    product.order_product_status = updateType === ACCEPT
      ? orders_products_status_names.ACCEPTED
      : orders_products_status_names.REJECTED


    // Query for all products' statuses in the order
    const res = await makeGraphQLQuery("getOrderProductStatuses", { order_id: orderId })

    // Update merchant status if all products are accounted for
    const sellerProducts = res.order_by_pk.orders_products
      .filter((item) => item.variation_pair.product.seller_id === user.sub)
    const allAccountedForSeller = sellerProducts
      .every((item) => item.orders_products_status_id !== orders_products_status_enum.CONFIRMATION_PENDING)
    if (allAccountedForSeller) {
      const allRejectedForSeller = sellerProducts
        .every((item) => item.orders_products_status_id === orders_products_status_enum.REJECTED)
      const payload = {
        order_id: orderId,
        user_id: user.sub,
        orders_sellers_status_id: allRejectedForSeller
          ? orders_sellers_status_enum.REJECTED
          : orders_sellers_status_enum.ACCEPTED
      }
      await makeGraphQLQuery("updateOrderSellerStatus", payload)
        .catch((err) => console.log(err))
      // Update display
      setMerchantStatus(allRejectedForSeller
        ? orders_sellers_status_names.REJECTED
        : orders_sellers_status_names.ACCEPTED
      )
    }

    // Update this order's status if all products are rejected
    const allRejected = res.order_by_pk.orders_products
      .every((item) => item.orders_products_status_id === orders_products_status_enum.REJECTED)
    if (allRejected) {
      const payload = {
        order_id: orderId,
        order_status_id: order_status_enum.CANCELED,
      }
      await makeGraphQLQuery("updateOrderStatus", payload)
        .catch((err) => console.log(err))
      // Refund the entire charge
      const response = await fetch('/api/payment/refund_all', {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ payment_intent_id: paymentIntentId }),
      })
      const data = await response.json()
      if (data.statusCode === 500) {
        console.error(data.message)
      }
    }

    alert("Updated status!")
    setLoading(false)
  }

  if (!user) {
    return (
      <SpinnerWithMessage label="Getting User" />
    );
  }

  return (
    <div key={index} className="px-4 py-2">
      <div className="flex items-center my-2">
        <Link href={`/product?product_id=${product.product_id}`} passHref>
          <p className="text-md cursor-pointer hover:text-blue-400">
            {
              `${product.product_name} ${product.variation_1}${product.variation_2 ? `/${product.variation_2}` : ""} x${product.product_amount} - Total: $${convertCentToDollar(product.total_price)} - Status: ${product.order_product_status}`
            }
          </p>
        </Link>

        {
          product.order_product_status === "CONFIRMATION_PENDING" &&
          <div>
            <button
              type="button"
              onClick={() => handleUpdate(ACCEPT)}
              disabled={loading}
              className="cursor-pointer ml-4 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Accept
            </button>
            <button
              type="button"
              onClick={() => handleUpdate(REJECT)}
              disabled={loading}
              className="cursor-pointer ml-4 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Reject
            </button>
          </div>
        }
      </div>
    </div>
  )
}

export default ProductStatus;
