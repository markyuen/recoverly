import React, { useReducer } from "react";
import FormBorder from "../Common/FormBorder";
import FormInputWithLeading from "../Common/FormInputWithLeading";
import FormMultipleFileUpload from "../Common/FormMultipleFileUpload";
import FormMultipleTags from "../Common/FormMultipleTags";
import FormSegment from "../Common/FormSegment";
import FormSingleInput from "../Common/FormSingleInput";
import FormTextArea from "../Common/FormTextArea";
import FormTwoInputFields from "../Common/FormTwoInputFields";

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

    default:
      throw new Error(
        "Unsupported Form Field. Please look at SellerItemReducer"
      );
  }
};

const AddItemForm = () => {
  const [formState, dispatch] = useReducer(SellerItemReducer, initialState);

  console.log(formState);

  return (
    <>
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
        <FormSingleInput
          type="text"
          label="Brand Name"
          dispatch={dispatch}
          action_type={MODIFY_BRAND_NAME}
          value={formState.brand_name}
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
        <FormMultipleTags label="Categories" />
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
    </>
  );
};

export default AddItemForm;
