import React, { useEffect, useReducer, useState } from "react";
import { useUserRole } from "../../context/UserRoleContext";
import useChakraToast from "../../hooks/useChakraToast";
import { makeGraphQLQuery } from "../../lib/GraphQL";
import { uploadFile } from "../../lib/s3";
import { seller_category } from "../../types/seller";
import FormBorder from "../Common/FormBorder";
import FormInputWithLeading from "../Common/FormInputWithLeading";
import FormMultipleFileUpload from "../Common/FormMultipleFileUpload";
import FormMultipleTags from "../Common/FormMultipleTags";
import FormSegment from "../Common/FormSegment";
import FormSelectInput from "../Common/FormSelectInput";
import FormSingleInput from "../Common/FormSingleInput";
import FormSingleInputSelect from "../Common/FormSingleInputSelect";
import FormTextArea from "../Common/FormTextArea";
import FormTwoInputFields from "../Common/FormTwoInputFields";
import SkeletonGrid from "../Skeleton/SkeletonGrid";
import SkeletonPage from "../Skeleton/SkeletonPage";

const initialState = {
  product_name: "",
  brand_name: "",
  description: "",
  current_price: 0,
  usual_retail_price: 0,
  number_in_stock: 0,
  images: [],
  specifications: [],
  categories: [],
  product_status: "",
};

export const MODIFY_PRODUCT_NAME = "MODIFY_PRODUCT_NAME";
export const MODIFY_BRAND_NAME = "MODIFY_BRAND_NAME";
export const MODIFY_PRODUCT_DESCRIPTION = "MODIFY_PRODUCT_DESCRIPTION";
export const MODIFY_USUAL_RETAIL_PRICE = "MODIFY_USUAL_RETAIL_PRICE";
export const MODIFY_CURRENT_PRICE = "MODIFY_CURRENT_PRICE";
export const MODIFY_NUMBER_IN_STOCK = "MODIFY_NUMBER_IN_STOCK";
export const ADD_IMAGES_TO_FORM = "ADD_IMAGES_TO_FORM";
export const REMOVE_IMAGES_FROM_FORM = "REMOVE_IMAGES_FROM_FORM";
export const ADD_SPECIFICATIONS_TO_FORM = "ADD_SPECIFICATIONS_TO_FORM";
export const REMOVE_SPECIFICATIONS_FROM_FORM =
  "REMOVE_SPECIFICATIONS_FROM_FORM";
export const ADD_CATEGORY_TO_FORM = "ADD_CATEGORY_TO_FORM";
export const REMOVE_CATEGORY_FROM_FORM = "REMOVE_CATEGORY_FROM_FORM";
export const SET_PRODUCT_STATUS = "SET_PRODUCT_STATUS";

const SellerItemReducer = (state, action) => {
  switch (action.type) {
    case MODIFY_PRODUCT_NAME:
      return { ...state, product_name: action.payload };
    case MODIFY_BRAND_NAME:
      return { ...state, brand_name: action.payload };
    case MODIFY_PRODUCT_DESCRIPTION:
      return { ...state, description: action.payload };
    case MODIFY_USUAL_RETAIL_PRICE:
      return { ...state, usual_retail_price: action.payload };
    case MODIFY_CURRENT_PRICE:
      return { ...state, current_price: action.payload };
    case MODIFY_NUMBER_IN_STOCK:
      return { ...state, number_in_stock: action.payload };
    case ADD_IMAGES_TO_FORM:
      return { ...state, images: state.images.concat(action.payload) };
    case REMOVE_IMAGES_FROM_FORM:
      return {
        ...state,
        images: state.images.filter((_, index) => index !== action.payload),
      };
    case ADD_SPECIFICATIONS_TO_FORM:
      return {
        ...state,
        specifications: state.specifications.concat(action.payload),
      };
    case REMOVE_SPECIFICATIONS_FROM_FORM:
      return {
        ...state,
        specifications: state.specifications.filter(
          (_, index) => index !== action.payload
        ),
      };
    case ADD_CATEGORY_TO_FORM:
      return {
        ...state,
        categories: state.categories.concat(action.payload),
      };
    case REMOVE_CATEGORY_FROM_FORM:
      return {
        ...state,
        categories: state.categories.filter(
          (item) => item.id !== action.payload
        ),
      };
    case SET_PRODUCT_STATUS:
      return {
        ...state,
        product_status: action.payload,
      };

    default:
      throw new Error(
        "Unsupported Form Field. Please look at SellerItemReducer"
      );
  }
};

const AddItemForm = () => {
  const [formState, dispatch] = useReducer(SellerItemReducer, initialState);
  const { userId } = useUserRole();
  const [loading, setLoading] = useState(true);
  const [productStatus, setProductStatus] = useState([]);
  const [categories, setCategories] = useState<seller_category[]>([]);
  const { generateWarningToast, generateSuccessToast } = useChakraToast();

  useEffect(() => {
    Promise.all([
      makeGraphQLQuery("getCategoryNamesAndID", {}),
      makeGraphQLQuery("getProductStatusList", {}),
    ]).then(([categoryNamesandId, productStatusList]) => {
      const normalized_categories = categoryNamesandId["category"].map(
        (item) => {
          return {
            name: item.category_name,
            id: item.category_id,
          };
        }
      );
      setCategories(normalized_categories);

      const normalizedProductStatus = productStatusList["product_status"].map(
        (item) => {
          return {
            name: item.product_status_name,
            value: item.product_status_id,
          };
        }
      );
      dispatch({
        type: SET_PRODUCT_STATUS,
        payload: normalizedProductStatus[0],
      });
      setProductStatus(normalizedProductStatus);

      setLoading(false);
    });
  }, []);

  console.log(formState);

  const addProduct = (e) => {
    e.preventDefault();

    const imageFiles = formState.images.map((item, index) => {
      return {
        file: item,
        name: `IMAGE_${index}`,
      };
    });
    const specificationFiles = formState.images.map((item, index) => {
      return {
        file: item,
        name: `SPECIFICATION_${index}`,
      };
    });
    const allFiles = imageFiles.concat(specificationFiles);
    const promises = allFiles.map((item) => {
      return uploadFile(item.name, item.file);
    });

    // TODO:
    // 2. Fix up a graphql query for categories

    const product_upload = makeGraphQLQuery("insertNewProduct", {
      brand_name: formState.brand_name,
      current_price: formState.current_price,
      description: formState.description,
      number_in_stock: formState.number_in_stock,
      product_name: formState.product_name,
      user_id: userId,
      usual_retail_price: formState.usual_retail_price,
      product_status: formState.product_status.value,
    });
    Promise.all([product_upload, ...promises])
      .then(([insert_product, ...urls]) => {
        // Cannot Upload Product
        if (!insert_product || !insert_product["insert_product_one"]) {
          throw new Error("Failed to upload product. Please try again later");
        }
        const product_id = insert_product["insert_product_one"]["product_id"];

        const images = urls
          .filter((item) => item.includes("IMAGE"))
          .map((url) => {
            return {
              product_id,
              url,
            };
          });
        const specifications = urls
          .filter((item) => item.includes("IMAGE"))
          .map((url) => {
            return {
              product_id,
              url,
            };
          });
        const categories = formState.categories.map((item) => {
          return { category_id: item.id, product_id };
        });
        return makeGraphQLQuery("insertProductInformation", {
          categories,
          images,
          specifications,
        });
      })
      .then((res) => {
        if (
          !res ||
          !res["insert_products_categories"] ||
          !res["insert_product_image"] ||
          !res["insert_product_specification"]
        ) {
          throw new Error("Unable to upload product. Please try again later");
        }
        generateSuccessToast("Success!", "Product Uploaded Successfully");
      })
      .catch((err) => {
        generateWarningToast(
          "Unable to upload Image",
          "Please try again later. Contact our help desk if the problem persists"
        );
      });
  };

  if (loading) {
    return <SkeletonGrid count={10} />;
  }

  return (
    <form onSubmit={addProduct}>
      <FormSegment
        title="Product Information"
        description="Tell us more about the product you're listing"
      >
        <FormSingleInput
          type="text"
          label="Product Name"
          dispatch={dispatch}
          action_type={MODIFY_PRODUCT_NAME}
          value={formState.product_name}
        />
        {/* TODO : Convert this to pull from all existing brand names */}
        <FormSingleInput
          type="text"
          label="Brand Name"
          dispatch={dispatch}
          action_type={MODIFY_BRAND_NAME}
          value={formState.brand_name}
        />
        <FormSingleInputSelect
          label="Product Status"
          value={formState.product_status}
          options={productStatus}
          dispatch={dispatch}
          action_type={SET_PRODUCT_STATUS}
        />

        <FormTextArea
          label="Description"
          description="Let the consumer know more about your product"
          placeholder="Description goes here"
          dispatch={dispatch}
          value={formState.description}
          action_type={MODIFY_PRODUCT_DESCRIPTION}
        />
        <FormTwoInputFields
          first_label="Usual Retail Price"
          first_placeholder="0.00"
          first_type="number"
          first_action_type={MODIFY_USUAL_RETAIL_PRICE}
          first_value={formState.usual_retail_price}
          second_label="Current Price"
          second_placeholder="0.00"
          second_type="number"
          second_action_type={MODIFY_CURRENT_PRICE}
          second_value={formState.current_price}
          dispatch={dispatch}
        />
        <FormSingleInput
          type="number"
          label="Total Number In Stock"
          value={formState.number_in_stock}
          dispatch={dispatch}
          action_type={MODIFY_NUMBER_IN_STOCK}
        />
        <FormMultipleTags
          categories={categories}
          value={formState.categories}
          label="Categories"
          dispatch={dispatch}
          action_type={ADD_CATEGORY_TO_FORM}
          remove_type={REMOVE_CATEGORY_FROM_FORM}
        />
      </FormSegment>

      <FormBorder />
      <FormSegment
        title="Supporting Documents"
        description="Upload any PDFs or Images that are relevant to your listing"
      >
        <FormMultipleFileUpload
          label="Product Specifications"
          supported_file_types={["pdf"]}
          dispatch={dispatch}
          action_type={ADD_SPECIFICATIONS_TO_FORM}
          remove_type={REMOVE_SPECIFICATIONS_FROM_FORM}
          value={formState.specifications}
        />
        <FormMultipleFileUpload
          label="Product Images"
          supported_file_types={["jpeg", "jpg", "png"]}
          dispatch={dispatch}
          action_type={ADD_IMAGES_TO_FORM}
          remove_type={REMOVE_IMAGES_FROM_FORM}
          value={formState.images}
        />
      </FormSegment>
      <div className="flex flex-row-reverse mt-10">
        <button
          onClick={addProduct}
          className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default AddItemForm;
