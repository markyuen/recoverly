import React, { useEffect, useState } from "react";
import {
  ProductCartVariation,
  product_page_variation,
} from "../../types/product";
import QuantityButtonWithAddToCart from "./QuantityButtonWithDispatch";

type ProductVariationsProps = {
  product_id: number;
  product_name: string;
  variations: product_page_variation[];
};

const ProductVariations = ({
  product_id,
  product_name,
  variations,
}: ProductVariationsProps) => {
  const [currPrice, setCurrPrice] = useState(null);
  const [currQty, setCurrQty] = useState(null);
  const [currVariation, setCurrVariation] =
    useState<ProductCartVariation>(null);
  const [currCount, setCurrCount] = useState(null);
  const [currPrevPrice, setCurrPrevPrice] = useState(null);

  useEffect(() => {
    if (variations.length == 0) {
      return;
    }
    const {
      variation_1,
      variation_2,
      discounted_price,
      original_price,
      quantity,
    } = variations[0];

    setCurrPrice(discounted_price);
    setCurrQty(quantity);
    setCurrVariation({
      variation_1,
      variation_2,
      price: discounted_price,
      quantity,
    });
    setCurrPrevPrice(original_price);
  }, [variations]);

  return (
    <>
      {currPrice !== null && (
        <>
          <p className="text-gray-700 text-sm">
            <span className="line-through	text-red-600 mr-2">
              ${currPrevPrice}
            </span>
            ${currPrice} with {currQty} remaining
          </p>
          <QuantityButtonWithAddToCart
            currPrice={currPrice}
            product_id={product_id}
            product_name={product_name}
            variation_1={currVariation.variation_1}
            variation_2={currVariation.variation_2}
            limit={currQty}
          />
        </>
      )}
      <p>Variations:</p>
      <div className="grid mt-2 grid-cols-3 gap-y-2">
        {variations
          .filter(({ quantity }) => quantity > 0)
          .map((variation, index) => {
            const {
              variation_1,
              variation_2,
              discounted_price,
              original_price,
              quantity,
            } = variation;
            const extraProps =
              currVariation &&
              currVariation.variation_1 === variation_1 &&
              currVariation.variation_2 === variation_2
                ? "bg-red-400"
                : "";

            return (
              <div
                key={index}
                onClick={() => {
                  setCurrPrice(discounted_price);
                  setCurrQty(quantity);
                  setCurrVariation({
                    variation_1,
                    variation_2,
                    price: discounted_price,
                    quantity,
                  });
                  setCurrPrevPrice(original_price);
                }}
                className={`text-center border rounded-full px-2 py-2 cursor-pointer mr-2 mb-2 col-span-1 ${extraProps}`}
              >
                {variation_2 ? `${variation_1}, ${variation_2}` : variation_1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProductVariations;
