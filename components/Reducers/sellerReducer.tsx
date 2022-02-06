import {
  MODIFY_PRODUCT_NAME,
  MODIFY_BRAND_NAME,
  MODIFY_PRODUCT_DESCRIPTION,
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
  UPDATE_VARIATION_QUANTITY,
  UPDATE_VARIATION_ORIGINAL_PRICE,
  UPDATE_VARIATION_DISCOUNTED_PRICE,
  UPDATE_MAIN_CATEGORY,
} from "../../constants/seller";
import { addVariationCategory } from "../../lib/addFormState";
import { ProductFormItem } from "../../types/seller";

function round(num) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

export const SellerItemReducer = (state: ProductFormItem, action) => {
  switch (action.type) {
    case MODIFY_PRODUCT_NAME:
      return { ...state, product_name: action.payload };
    case MODIFY_BRAND_NAME:
      return { ...state, brand_name: action.payload };
    case MODIFY_PRODUCT_DESCRIPTION:
      return { ...state, description: action.payload };
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
    case UPDATE_MAIN_CATEGORY:
      return {
        ...state,
        main_category: action.payload,
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
        variation_categories: [...state.variation_categories, action.payload],
      };

    case REMOVE_VARIATION_CATEGORY_FROM_FORM_STATE: {
      try {
        const newState = {
          ...state,
          variation_categories: state.variation_categories.filter(
            (item) => item !== action.payload
          ),
        };

        // Remove it from variations
        delete newState["variations"][action.payload];

        newState.variation_sku = {};

        if (newState.variation_categories.length == 1) {
          const remaining_category = newState.variation_categories[0];
          // We only have a single category
          if (newState.variations[remaining_category]) {
            newState.variations[remaining_category].forEach((variation) => {
              newState.variation_sku[variation] = {
                "": [0, 0, 0],
              };
            });
          }
        }

        return newState;
      } catch (error) {
        return state;
      }
      // TODO: Check to ensure that all data is removed from variation sku when deleting category.`
    }

    case REMOVE_VARIATION_FROM_FORM_STATE: {
      try {
        const { variation_name, variation_category } = action.payload;
        // We first update our variation dictionary
        const newState = {
          ...state,
          variations: {
            ...state.variations,
            [variation_category]: state.variations[variation_category].filter(
              (item) => item != variation_name
            ),
          },
        };

        // Then we delete the variation category from the variations list if there are no more exisitng variations
        if (newState.variations[variation_category].length === 0) {
          delete newState.variations[variation_category];
        }

        const base_options = Object.keys(state.variation_sku);
        const altCategory = state.variation_categories.filter(
          (item) => item !== variation_category
        )[0];

        // If the category we are deleting from is the base category then we need to remove the key from the variation_sku
        if (
          base_options.filter((item) =>
            state.variations[variation_category].includes(item)
          ).length > 0
        ) {
          delete newState["variation_sku"][variation_name];
          if (
            Object.keys(newState.variation_sku).length == 0 &&
            newState.variation_categories.length == 2
          ) {
            if (
              newState.variations[altCategory] &&
              newState.variations[altCategory].length > 0
            ) {
              newState.variations[altCategory].forEach((variation) => {
                newState.variation_sku[variation] = {
                  "": [0, 0, 0],
                };
              });
            }
          }
        } else {
          // Otherwise we need to remove the variation from the variation_sku by iterating over the individual variables. This assumes that we have 2 categories
          if (
            altCategory &&
            newState.variations[altCategory] &&
            newState.variations[altCategory].length > 0
          ) {
            newState.variations[altCategory].forEach((base_variation) => {
              delete newState.variation_sku[base_variation][variation_name];
              if (
                Object.keys(newState.variation_sku[base_variation]).length === 0
              ) {
                newState.variation_sku[base_variation] = {
                  "": [0, 0, 0],
                };
              }
            });
          }
        }
        return newState;
      } catch (error) {
        console.log(error);
        return state;
      }
    }

    case ADD_NEW_VARIATION_TO_FORM_STATE: {
      const { variation_category, variation_name } = action.payload;

      const newVariations = state.variations[variation_category]
        ? [...state.variations[variation_category], variation_name]
        : [variation_name];

      try {
        return {
          ...state,
          variations: {
            ...state.variations,
            [variation_category]: newVariations,
          },
          variation_sku: addVariationCategory(
            state.variation_sku,
            state.variations,
            variation_name,
            variation_category,
            state.variation_categories
          ),
        };
      } catch (error) {
        console.log(error);
        return {
          ...state,
        };
      }
    }

    case UPDATE_VARIATION_QUANTITY: {
      try {
        const { variation_id_1, variation_id_2, count } = action.payload;
        const newState = {
          ...state,
        };

        if (newState.variation_sku[variation_id_1]) {
          newState.variation_sku[variation_id_1][variation_id_2][0] =
            parseInt(count);
        } else {
          newState.variation_sku[variation_id_2][variation_id_1][0] =
            parseInt(count);
        }
        return newState;
      } catch (error) {
        console.log(error);
        return {
          ...state,
        };
      }
    }

    case UPDATE_VARIATION_DISCOUNTED_PRICE: {
      try {
        const { variation_id_1, variation_id_2, count } = action.payload;
        const newState = {
          ...state,
        };

        if (newState.variation_sku[variation_id_1]) {
          newState.variation_sku[variation_id_1][variation_id_2][1] =
            round(count);
        } else {
          newState.variation_sku[variation_id_2][variation_id_1][1] =
            round(count);
        }
        return newState;
      } catch (error) {
        console.log(error);
        return {
          ...state,
        };
      }
    }

    case UPDATE_VARIATION_ORIGINAL_PRICE: {
      try {
        const { variation_id_1, variation_id_2, count } = action.payload;
        const newState = {
          ...state,
        };

        if (newState.variation_sku[variation_id_1]) {
          newState.variation_sku[variation_id_1][variation_id_2][2] =
            round(count);
        } else {
          newState.variation_sku[variation_id_2][variation_id_1][2] =
            round(count);
        }
        return newState;
      } catch (error) {
        console.log(error);
        return {
          ...state,
        };
      }
    }

    default:
      throw new Error(
        "Unsupported Form Field. Please look at SellerItemReducer"
      );
  }
};
