import Link from "next/link";
import { convertCentToDollar } from "../../lib/helpers";
import { CartItem } from "../../types/items";
import CartItemDisplay from "./CartItemDisplay";

const ShoppingCart = ({ cartItemsBySeller }) => {
  return (
    <div className="col-span-4">
      <div className="grid space-y-4 grid-cols-1">
        {
          cartItemsBySeller.map(({ company, items, item_total, shipping_fee }, index: number) => {
            return (
              <div key={index} className="border-2">
                <p>
                  <b>Company:</b> {company}
                </p>

                {items.map((item: CartItem, index: number) => {
                  return (
                    <div key={index} className="px-4 py-2">
                      <div>
                        <Link href={`/product?product_id=${item.product_id}`} passHref>
                          <p className="text-md font-bold cursor-pointer hover:text-blue-400">
                            {item.product_name}
                          </p>
                        </Link>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <CartItemDisplay
                            seller_id={item.seller_id}
                            product_id={item.product_id}
                            product_name={item.product_name}
                            variation_pair_id={item.variation_pair_id}
                            variation_1={item.variation_1}
                            variation_2={item.variation_2}
                            quantity={item.quantity}
                            discounted_price={item.discounted_price}
                            limit={item.limit}
                          />
                        </div>
                      </div>
                      <p>
                        Total: ${convertCentToDollar(item.quantity * item.discounted_price)}
                      </p>
                    </div>
                  )
                })
                }

                <p>
                  <b>Company Shipping Fee:</b> {
                    shipping_fee === 0 ? "You qualify for free shipping!" : `$${convertCentToDollar(shipping_fee)}`
                  }
                </p>

                <p>
                  <b>Company Product Total:</b> {convertCentToDollar(item_total + shipping_fee)}
                </p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default ShoppingCart;
