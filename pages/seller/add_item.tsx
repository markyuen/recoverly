import React from "react";
import InternalLink from "../../components/Common/Link";
import ShopNav from "../../components/layouts/ShopNav";
import AddItemForm from "../../components/Seller/AddItemForm";
import SkeletonGrid from "../../components/Skeleton/SkeletonGrid";
import { useUserRole } from "../../context/UserRoleContext";
import useChakraToast from "../../hooks/useChakraToast";
import { createNewProduct } from "../../lib/seller";
import { productInitialState } from "../../types/seller";

const AddItem = () => {
  const { userId } = useUserRole();
  const initialStateTemplate = productInitialState;
  const { generateSuccessToast, generateWarningToast } = useChakraToast();

  if (!userId) {
    return <SkeletonGrid count={4} />;
  }

  return (
    <ShopNav>
      <InternalLink
        name="Go Back to Dashboard"
        href="/seller"
        styling="pr-2 mb-4 cursor-pointer text-blue-400 hover:underline transition duration-75"
        type="verified-seller"
      />
      <AddItemForm
        initialState={initialStateTemplate}
        handleSubmit={(formState) =>
          createNewProduct(
            formState,
            generateWarningToast,
            generateSuccessToast
          )
        }
      />
    </ShopNav>
  );
};

export default AddItem;

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: ["verified-seller", "admin"],
    },
  };
}
