import { useUser } from "@auth0/nextjs-auth0";
import React, { useEffect, useState } from "react";
import SpinnerWithMessage from "../Common/SpinnerWithMessage";
import { Order } from "../../types/orders";
import { makeGraphQLQuery } from "../../lib/GraphQL";
import SellerOrderDisplay from "./SellerOrderDisplay";

const SellerOrders = () => {
  const { user } = useUser()
  const [orderData, setOrderData] = useState<Order[]>(null)

  useEffect(() => {
    if (!user) return;
    makeGraphQLQuery("getSellerOrders", { user_id: user.sub })
      .then((res) => {
        const data: Order[] = res.order
          .map((item) => {
            return {
              order_id: item.order_id,
              shipping_address: item.shipping_address,
              stripe_checkout_id: item.stripe_checkout_id,
              stripe_payment_intent_id: item.stripe_payment_intent_id,
              order_status: item.order_status.order_status_name,
              created_at: new Date(item.created_at + "Z"),
              products: item.orders_products
                .map((product) => {
                  return {
                    seller_id: product.variation_pair.product.seller_id,
                    product_name: product.variation_pair.product.product_name,
                    product_id: product.variation_pair.product_id,
                    variation_pair_id: product.variation_pair_id,
                    variation_1: product.variation_pair.variation_1,
                    variation_2: product.variation_pair.variation_2,
                    product_amount: product.product_amount,
                    total_price: product.total_price,
                    order_product_status: product.orders_products_status.orders_products_status_name,
                  }
                }),
              sellers: item.orders_sellers
                .map((seller) => {
                  return {
                    user_id: seller.user_id,
                    company_name: seller.seller.company_name,
                    stripe_id: seller.seller.stripe_id,
                    delivery_fee: seller.delivery_fee,
                    stripe_transfer_id: seller.stripe_transfer_id,
                    order_seller_status: seller.orders_sellers_status.orders_sellers_status_name,
                  }
                }),
            }
          })
        console.log(data)
        setOrderData(data)
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [user])

  if (!orderData) {
    return (
      <SpinnerWithMessage label="Getting Order Information" />
    );
  }

  return (
    <div className="col-span-4">
      <div className="grid space-y-4 grid-cols-1">
        {
          orderData.map((order: Order, index: number) => {
            return <SellerOrderDisplay
              key={index}
              order={order}
              index={index}
            />
          })
        }
      </div>
    </div>
  );
};

export default SellerOrders;
