import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InternalLink from "../../components/Common/Link";
import SpinnerWithMessage from "../../components/Common/SpinnerWithMessage";
import ShopNav from "../../components/layouts/ShopNav";
import AddItemForm from "../../components/Seller/AddItemForm";
import SkeletonGrid from "../../components/Skeleton/SkeletonGrid";
import { useUserRole } from "../../context/UserRoleContext";
import useChakraToast from "../../hooks/useChakraToast";
import { makeGraphQLQuery } from "../../lib/GraphQL";
import { updateProductInformation } from "../../lib/seller";
import { ProductFormItem, productInitialState } from "../../types/seller";

const EditItemPage = () => {
  const router = useRouter();
  const { userId } = useUserRole();
  // const { product_id } = router.query;
  const product_id = router.query["product_id"] as string;
  const [initialState, setInitialState] = useState<ProductFormItem>(null);
  const [loading, setLoading] = useState(true);
  const { generateWarningToast, generateSuccessToast } = useChakraToast();

  useEffect(() => {
    if (!product_id || !userId) {
      return;
    }
    makeGraphQLQuery("getItemInfo", {
      seller_id: userId,
      product_id,
    })
      .then(({ product }) => {
        if (!product || product.length == 0) {
          throw new Error("Unable to retrieve information about product");
        }
        const {
          product_name,
          description,
          ind_usual_retail_price: usual_retail_price,
          ind_current_price: current_price,
          number_in_stock,
          products_categories,
          product_images,
          product_specifications,
          brand: { brand_name, brand_id },
        } = product[0];
        const formatted_product_information: ProductFormItem = {
          product_id,
          product_name,
          description,
          brand_name: {
            value: brand_id,
            label: brand_name,
          },
          usual_retail_price,
          current_price,
          number_in_stock,
          categories: products_categories.map(
            ({ category: { category_id, category_name } }) => {
              return {
                value: category_id,
                name: category_name,
              };
            }
          ),
          images: [],
          specifications: [],
          product_status: { value: 1, name: "ACTIVE" },
          seller_id: {
            value: userId,
            name: userId,
          },
          existing_images: product_images.map((item) => {
            return {
              image_id: item.product_image_id,
              image_url: item.url,
            };
          }),
          existing_specifications: product_specifications.map((item) => {
            return {
              specification_id: item.product_specification_id,
              specification_url: item.url,
            };
          }),
          // existing_images: product_images
        };
        setInitialState(formatted_product_information);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [userId, product_id]);

  // TODO
  // 1. Hook up category deletion
  // 2. Hook up PDF carousel
  // 3. Hook up ability to update + force refresh of page

  return (
    <ShopNav>
      <InternalLink
        name="Go Back to Dashboard"
        href="/seller"
        styling="pr-2 mb-4 cursor-pointer text-blue-400 hover:underline transition duration-75"
        type="customer"
      />
      {loading ? (
        <SpinnerWithMessage label="Downloading Product Information" />
      ) : (
        <AddItemForm
          initialState={initialState}
          handleSubmit={(formState) =>
            updateProductInformation(
              formState,
              generateSuccessToast,
              generateWarningToast
            )
          }
        />
      )}
    </ShopNav>
  );
};

export default EditItemPage;
