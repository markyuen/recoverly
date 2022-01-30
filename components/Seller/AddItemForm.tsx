import { Spinner, toast } from "@chakra-ui/react";
import React, { useEffect, useReducer, useState } from "react";
import { useUserRole } from "../../context/UserRoleContext";
import useChakraToast from "../../hooks/useChakraToast";
import { makeGraphQLQuery } from "../../lib/GraphQL";
import { uploadFile } from "../../lib/s3";
import { brand, ProductFormItem, seller_category } from "../../types/seller";
import FormBorder from "../Common/FormBorder";
import FormInputWithLeading from "../Common/FormInputWithLeading";
import FormMultipleFileUpload from "../Common/FormMultipleFileUpload";
import FormMultipleTags from "../Common/FormMultipleTags";
import FormSegment from "../Common/FormSegment";
import FormSelectCreatable from "../Common/FormSelectCreatable";
import FormSelectInput from "../Common/FormSelectInput";
import FormSingleInput from "../Common/FormSingleInput";
import FormSingleInputSelect from "../Common/FormSingleInputSelect";
import FormTextArea from "../Common/FormTextArea";
import FormTwoInputFields from "../Common/FormTwoInputFields";
import ImageCarousell, { CarousellImage } from "../Common/ImageCarousell";
import PDFCarousell, { CarousellPDF } from "../Common/PDFCarousell";
import SpinnerWithMessage from "../Common/SpinnerWithMessage";
import SkeletonGrid from "../Skeleton/SkeletonGrid";
import SkeletonPage from "../Skeleton/SkeletonPage";

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
export const SET_SELLER_ID = "SET_SELLER_ID";
export const REMOVE_EXISTING_IMAGE_FROM_FORM_STATE =
  "REMOVE_EXISTING_IMAGE_FROM_FORM_STATE";
export const REMOVE_EXISTING_SPECIFICATION_FROM_FORM_STATE =
  "REMOVE_EXISTING_SPECIFICATION_FROM_FORM_STATE";

const SellerItemReducer = (state: ProductFormItem, action) => {
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
          (item) => item.value !== action.payload
        ),
      };
    case SET_PRODUCT_STATUS:
      return {
        ...state,
        product_status: action.payload,
      };
    case SET_SELLER_ID:
      return {
        ...state,
        seller_id: action.payload,
      };
    case REMOVE_EXISTING_IMAGE_FROM_FORM_STATE:
      return {
        ...state,
        existing_images: state.existing_images.filter(
          (item) => item.image_id !== action.payload
        ),
      };
    case REMOVE_EXISTING_SPECIFICATION_FROM_FORM_STATE:
      return {
        ...state,
        existing_specifications: state.existing_specifications.filter(
          (item) => item.specification_id !== action.payload
        ),
      };

    default:
      throw new Error(
        "Unsupported Form Field. Please look at SellerItemReducer"
      );
  }
};

type AddItemFormProps = {
  initialState: ProductFormItem;
  handleSubmit: (productFormItem: ProductFormItem) => void;
};

const AddItemForm = ({ initialState, handleSubmit }: AddItemFormProps) => {
  const [formState, dispatch] = useReducer(SellerItemReducer, initialState);
  const userData = useUserRole();
  const { userId, role } = userData;
  const [loading, setLoading] = useState(true);
  const [productStatus, setProductStatus] = useState([]);
  const [categories, setCategories] = useState<seller_category[]>([]);
  const [sellers, setSellers] = useState([]);
  const [brandNames, setBrandNames] = useState<brand[]>([]);
  const { generateSuccessToast } = useChakraToast();

  useEffect(() => {
    if (!initialState) {
      return;
    }
    Promise.all([
      makeGraphQLQuery("getCategoryNamesAndID", {}),
      makeGraphQLQuery("getProductStatusList", {}),
      makeGraphQLQuery("getVerifiedSellerIDs", {}),
      makeGraphQLQuery("getBrandNames", {}),
    ]).then(
      ([
        categoryNamesandId,
        productStatusList,
        verifiedSellers,
        brandNames,
      ]) => {
        const normalized_sellers = verifiedSellers["seller"].map((item) => {
          return {
            value: item.user_id,
            name: item.user.email,
          };
        });
        setSellers(normalized_sellers);

        const normalized_categories = categoryNamesandId["category"].map(
          (item) => {
            return {
              name: item.category_name,
              value: item.category_id,
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

        const { brand } = brandNames;
        const normalizedBrandNames = brand.map((item) => {
          return {
            value: item.brand_id,
            label: item.brand_name,
          };
        });

        setBrandNames(normalizedBrandNames);

        dispatch({
          type: SET_PRODUCT_STATUS,
          payload: normalizedProductStatus[0],
        });
        if (role === "seller") {
          dispatch({
            type: SET_SELLER_ID,
            payload: {
              value: userId,
              name: userId,
            },
          });
        } else {
          dispatch({
            type: SET_SELLER_ID,
            payload: normalized_sellers[0],
          });
        }

        setProductStatus(normalizedProductStatus);
        setLoading(false);
      }
    );
  }, [initialState]);

  const addProduct = (e) => {
    e.preventDefault();
    console.log("------Inserting New product----");
    handleSubmit(formState);
  };

  const setBrand = (brand: brand) => {
    dispatch({
      type: MODIFY_BRAND_NAME,
      payload: brand,
    });
  };

  const removeExistingImage = (image: CarousellImage) => {
    makeGraphQLQuery("deleteImage", { image_id: image.image_id })
      .then((res) => {
        if (!res || !res["delete_product_image"]) {
          throw new Error("Error deleting image");
        }
        dispatch({
          type: REMOVE_EXISTING_IMAGE_FROM_FORM_STATE,
          payload: image.image_id,
        });
        generateSuccessToast("Success!", "Image deleted successfully");
      })
      .catch((err) => console.log(err));
  };

  const removeExistingPDF = (pdf: CarousellPDF) => {
    makeGraphQLQuery("deletePDFSpecification", {
      specificationID: pdf.specification_id,
    })
      // UPDATE FORM STATE PDFS
      .then((res) => {
        dispatch({
          type: REMOVE_EXISTING_SPECIFICATION_FROM_FORM_STATE,
          payload: pdf.specification_id,
        });
        generateSuccessToast("Success!", "Specification deleted successfully");
      })
      .catch((err) => console.log(err));
  };

  if (loading || !formState) {
    return <SpinnerWithMessage label="Configuring Form" />;
  }

  return (
    <form onSubmit={addProduct}>
      <FormSegment
        title="Product Information"
        description="Tell us more about the product you're listing"
      >
        {role === "admin" && (
          <FormSingleInputSelect
            label="Seller Email ( Indicate which seller you are choosing for )"
            value={formState.seller_id}
            options={sellers}
            dispatch={dispatch}
            action_type={SET_SELLER_ID}
          />
        )}
        <FormSingleInput
          type="text"
          label="Product Name"
          dispatch={dispatch}
          action_type={MODIFY_PRODUCT_NAME}
          value={formState.product_name}
        />
        <FormSelectCreatable
          value={formState.brand_name}
          label="Brand Name"
          options={brandNames}
          createObject={setBrand}
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
        <ImageCarousell
          label="Images on current Listing "
          callToAction="Delete Image"
          images={formState.existing_images}
          onClickHandler={(img) => removeExistingImage(img)}
        />

        <FormMultipleFileUpload
          label="Product Specifications"
          supported_file_types={["pdf"]}
          dispatch={dispatch}
          action_type={ADD_SPECIFICATIONS_TO_FORM}
          remove_type={REMOVE_SPECIFICATIONS_FROM_FORM}
          value={formState.specifications}
        />
        {formState.existing_specifications &&
          formState.existing_specifications.length > 0 && (
            <PDFCarousell
              label="Existing Product Specifications"
              callToAction="Delete PDF"
              pdfs={formState.existing_specifications}
              onClickHandler={(pdf) => removeExistingPDF(pdf)}
            />
          )}
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
