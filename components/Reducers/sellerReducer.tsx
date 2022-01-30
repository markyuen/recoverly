import {
  MODIFY_PRODUCT_NAME,
  MODIFY_BRAND_NAME,
  MODIFY_PRODUCT_DESCRIPTION,
  MODIFY_USUAL_RETAIL_PRICE,
  MODIFY_CURRENT_PRICE,
  MODIFY_NUMBER_IN_STOCK,
  ADD_IMAGES_TO_FORM,
  REMOVE_IMAGES_FROM_FORM,
  ADD_SPECIFICATIONS_TO_FORM,
  REMOVE_SPECIFICATIONS_FROM_FORM,
  ADD_CATEGORY_TO_FORM,
  REMOVE_CATEGORY_FROM_FORM,
  SET_PRODUCT_STATUS,
  SET_SELLER_ID,
  REMOVE_EXISTING_IMAGE_FROM_FORM_STATE,
  REMOVE_EXISTING_SPECIFICATION_FROM_FORM_STATE,
  ADD_NEW_VARIATION_CATEGORY_TO_FORM_STATE,
  ADD_NEW_VARIATION_TO_FORM_STATE,
  REMOVE_VARIATION_CATEGORY_FROM_FORM_STATE,
  REMOVE_VARIATION_FROM_FORM_STATE,
} from "../../constants/seller";
import { ProductFormItem } from "../../types/seller";

export const SellerItemReducer = (state: ProductFormItem, action) => {
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
    case ADD_NEW_VARIATION_CATEGORY_TO_FORM_STATE:
      return {
        ...state,
        variations: { ...state.variations, [action.payload]: [] },
      };
    case ADD_NEW_VARIATION_TO_FORM_STATE:
      //
      const new_state = { ...state };
      if (Object.keys(state.variations).length == 1) {
        new_state.variation_sku = {};
        const variation_category = Object.keys(state.variations)[0];
        state.variations[variation_category].forEach((element) => {
          new_state.variation_sku[element] = { "": 0 };
        });
      }

      return {
        ...state,
        variations: {
          ...state.variations,
          [action.payload.category]: [
            ...state.variations[action.payload.category],
            action.payload.variation,
          ],
        },
      };
    case REMOVE_VARIATION_CATEGORY_FROM_FORM_STATE:
      const { [action.payload]: _, variations } = state.variations;
      return {
        ...state,
        variations,
      };
    case REMOVE_VARIATION_FROM_FORM_STATE:
      const { category, variation } = action.payload;
      return {
        ...state,
        variations: {
          ...state.variations,
          [category]: state.variations[category].filter(
            (item) => item !== variation
          ),
        },
      };

    default:
      throw new Error(
        "Unsupported Form Field. Please look at SellerItemReducer"
      );
  }
};
