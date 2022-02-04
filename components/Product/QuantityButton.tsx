import { useUser } from "@auth0/nextjs-auth0";
import { Router, useRouter } from "next/router";
import React from "react";
import {
  REMOVE_ITEM_VARIATION,
  UPDATE_ITEM_COUNT,
  useCart,
} from "../../context/CartContext";
import { ItemProp } from "../../types/items";
import { useToast } from "@chakra-ui/react";
import useChakraToast from "../../hooks/useChakraToast";

type QuantityButtonProps = {
  data: ItemProp;
};

const iconSize = {
  small: "h-6 w-6 cursor-pointer",
  medium: "h-8 w-8 cursor-pointer",
};

const QuantityButton = ({
  product_id,
  variation_1,
  variation_2,
  limit,
  product_name,
  currPrice,
  size = "medium",
}) => {
  const { user } = useUser();
  const { dispatch, getProductCount } = useCart();
  const { generateWarningToast } = useChakraToast();
  const router = useRouter();
  const toast = useToast();

  console.log(limit);

  const checkForUser = () => {
    if (!user) {
      toast({
        position: "top",
        title: "Authorization Error",
        description:
          "Please login to add items to cart, redirecting to login now.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      router.push("/api/auth/login");
      return false;
    }
    return true;
  };

  const addOne = () => {
    console.log(`---AddOne triggered for ${variation_1},${variation_2}`);
    if (!checkForUser()) {
      return;
    }
    if (getProductCount(product_id, variation_1, variation_2) + 1 > limit) {
      generateWarningToast(
        "Item Limit Reached",
        `You can only add ${limit} items of this type`
      );
      return;
    }

    dispatch({
      type: UPDATE_ITEM_COUNT,
      payload: {
        product_id,
        variation_1,
        variation_2,
        quantity_to_add: 1,
        product_name,
        price: currPrice,
      },
    });
  };

  // How to save cart data in between refreshes
  const removeOne = () => {
    if (!checkForUser()) {
      return;
    }
    switch (getProductCount(product_id, variation_1, variation_2)) {
      case 0:
        return;
      case 1:
        dispatch({
          type: REMOVE_ITEM_VARIATION,
          payload: {
            product_id,
            variation_1,
            variation_2,
          },
        });
        break;
      default:
        dispatch({
          type: UPDATE_ITEM_COUNT,
          payload: {
            product_id,
            variation_1,
            variation_2,
            quantity_to_add: -1,
          },
        });
        break;
    }
  };

  return (
    <div className="flex items-center">
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
      <p className="px-2 text-md">
        {getProductCount(product_id, variation_1, variation_2)}
      </p>
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
    </div>
  );
};

export default QuantityButton;
