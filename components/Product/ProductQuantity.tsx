import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { UPDATE_ITEM_COUNT, REMOVE_ITEM, REMOVE_ID, useCart } from "../../context/CartContext";
import { useUserRole } from "../../context/UserRoleContext";
import useChakraToast from "../../hooks/useChakraToast";

const iconSize = {
  small: "h-6 w-6 cursor-pointer",
  medium: "h-8 w-8 cursor-pointer",
};

type ProductQuantityProps = {
  product_id: number;
  variation_pair_id: number;
  product_name: string;
  variation_1: string;
  variation_2: string;
  price: number;
  limit: number;
};

const ProductQuantity = ({
  product_id,
  variation_pair_id,
  product_name,
  variation_1,
  variation_2,
  price,
  limit,
}: ProductQuantityProps) => {
  const { user } = useUser();
  const { userId } = useUserRole();
  const {
    dispatch,
    productExistsInCart,
    getProductCount,
    updateCartProduct,
  } = useCart();
  const { generateWarningToast, generateSuccessToast } = useChakraToast();
  const router = useRouter();
  const size = "medium";

  const [count, setProductCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProductCount(getProductCount(variation_pair_id));
  }, [variation_pair_id]);

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
    if (count >= limit) {
      generateWarningToast("Error", "You can't add more than the limit");
      return;
    }
    setProductCount(count + 1);
  };

  const removeOne = () => {
    if (count <= 0) {
      return;
    }
    setProductCount(count - 1);
  };

  const handleUpdateCart = async () => {
    setLoading(true);
    try {
      if (!checkForUser()) {
        return;
      }
      if (count <= 0) {
        return generateWarningToast("Error", "Quantity must be greater than 0");
      }
      if (count === getProductCount(variation_pair_id)) {
        return generateWarningToast("Error", "Quantity must be different than current quantity");
      }
      await updateCartProduct(userId, variation_pair_id, count);
      dispatch({
        type: UPDATE_ITEM_COUNT,
        payload: {
          product_id,
          variation_pair_id,
          product_name,
          variation_1,
          variation_2,
          quantity: count,
          price,
          limit,
        },
      });
      generateSuccessToast("Added to Cart", "Item added to cart");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    setLoading(true);
    try {
      if (!checkForUser()) {
        return;
      }
      await updateCartProduct(userId, variation_pair_id, REMOVE_ID);
      dispatch({
        type: REMOVE_ITEM,
        payload: variation_pair_id,
      });
      setProductCount(0);
      generateSuccessToast("Removed from Cart", "Item removed from cart");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center my-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={iconSize[size]}
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
        onClick={() => { if (!loading) handleUpdateCart() }}
      >
        {productExistsInCart(variation_pair_id) ? "Update Cart" : "Add to Cart"}
      </div>
      {
        productExistsInCart(variation_pair_id) &&
        <div
          className="cursor-pointer ml-4 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => { if (!loading) handleRemoveFromCart() }}
        >
          Remove
        </div>
      }
    </div>
  );
};

export default ProductQuantity;
