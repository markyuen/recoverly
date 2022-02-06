import { useUser } from "@auth0/nextjs-auth0";

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { UPDATE_ITEM_COUNT, useCart } from "../../context/CartContext";
import useChakraToast from "../../hooks/useChakraToast";

const iconSize = {
  small: "h-6 w-6 cursor-pointer",
  medium: "h-8 w-8 cursor-pointer",
};

type QuantityButtonWithAddToCartProps = {
  product_id: number;
  variation_1: string;
  variation_2: string;
  limit: number;
  product_name;
  currPrice: number;
};

const QuantityButtonWithAddToCart = ({
  product_id,
  variation_1,
  variation_2,
  currPrice,
  product_name,
  limit,
}: QuantityButtonWithAddToCartProps) => {
  const { user } = useUser();
  const { dispatch, getProductCount } = useCart();
  const { generateWarningToast } = useChakraToast();
  const router = useRouter();
  const size = "medium";

  const [count, setProductCount] = React.useState(0);

  useEffect(() => {
    setProductCount(0);
  }, [variation_1, variation_2]);

  const checkForUser = () => {
    if (!user) {
      generateWarningToast(
        "Authorization Error",
        "Please login to add items to cart, redirecting to login now."
      );

      router.push("/api/auth/login");
      return false;
    }
    return true;
  };

  const addOne = () => {
    if (count + 1 > limit) {
      generateWarningToast("Error", "You can't add more than the limit");
      return;
    }
    setProductCount(count + 1);
  };

  const removeOne = () => {
    if (count - 1 < 0) {
      return;
    }
    setProductCount(count - 1);
  };

  const handleAddToCart = () => {
    if (!checkForUser()) {
      return;
    }
    dispatch({
      type: UPDATE_ITEM_COUNT,
      payload: {
        product_id,
        variation_1,
        variation_2,
        quantity_to_add: count,
        product_name,
        price: currPrice,
      },
    });
  };

  return (
    <div className="flex items-center my-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={iconSize[""]}
        viewBox="0 0 20 20"
        fill="currentColor"
        onClick={() => removeOne()}
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
          clipRule="evenodd"
        />
      </svg>
      <p className="px-2 text-md">{count}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={iconSize[size]}
        viewBox="0 0 20 20"
        fill="currentColor"
        onClick={() => addOne()}
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
          clipRule="evenodd"
        />
      </svg>
      <div
        className="cursor-pointer ml-4 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => handleAddToCart()}
      >
        Add To Cart
      </div>
    </div>
  );
};

export default QuantityButtonWithAddToCart;
