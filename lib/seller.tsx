import { ProductFormItem } from "../types/seller";
import { makeGraphQLQuery } from "./GraphQL";
import { uploadFile } from "./s3";

const generateVariations = (formState, product_id) => {
  const getVariationQuantity = (v1, v2, sku_count) => {
    if (sku_count[v1]) {
      return sku_count[v1][v2][0];
    }
    return sku_count[v2][v1][0];
  };

  const getVariationDiscountedPrice = (v1, v2, sku_count) => {
    if (sku_count[v1]) {
      return sku_count[v1][v2][1];
    }
    return sku_count[v2][v1][1];
  };

  const getVariationOriginalPrice = (v1, v2, sku_count) => {
    if (sku_count[v1]) {
      return sku_count[v1][v2][2];
    }
    return sku_count[v2][v1][2];
  };

  const { variation_categories, variations, variation_sku } = formState;
  const variation_1_category = variation_categories[0];
  const variation_2_category = variation_categories[1];

  const variation_insert_obj = variations[variation_1_category]
    .map((variation_1) => {
      if (variation_categories.length == 1) {
        return {
          product_id,
          variation_1,
          variation_1_category,
          quantity: getVariationQuantity(variation_1, "", variation_sku),
          original_price: getVariationOriginalPrice(
            variation_1,
            "",
            variation_sku
          ),
          discounted_price: getVariationDiscountedPrice(
            variation_1,
            "",
            variation_sku
          ),
        };
      }
      return variations[variation_2_category]
        .map((variation_2) => {
          return {
            product_id,
            variation_1,
            variation_1_category,
            variation_2,
            variation_2_category,
            quantity: getVariationQuantity(
              variation_1,
              variation_2,
              variation_sku
            ),
            original_price: getVariationOriginalPrice(
              variation_1,
              variation_2,
              variation_sku
            ),
            discounted_price: getVariationDiscountedPrice(
              variation_1,
              variation_2,
              variation_sku
            ),
          };
        })
        .flat();
    })
    .flat();

  return variation_insert_obj;
};

export const createNewProduct = (
  formState: ProductFormItem,
  generateWarningToast,
  generateSuccessToast
) => {
  if (!formState.images) {
    generateWarningToast("Error", "Please add some images for product");
    return;
  }

  if (!formState.seller_id) {
    generateWarningToast("Error", "Each item must have an associated seller");
    return;
  }

  const imageFiles = formState.images.map((item, index) => {
    return {
      file: item,
      name: `IMAGE_${index}`,
    };
  });
  const specificationFiles = formState.specifications.map((item, index) => {
    return {
      file: item,
      name: `SPECIFICATION_${index}`,
    };
  });
  const allFiles = imageFiles.concat(specificationFiles);
  const promises = allFiles.map((item) => {
    return uploadFile(item.name, item.file);
  });

  const variables = {
    brand_name: formState.brand_name.label,
    description: formState.description,
    product_name: formState.product_name,
    user_id: formState.seller_id.value,
    product_status: formState.product_status.value,
  };

  const product_upload = makeGraphQLQuery("insertNewProduct", variables);
  Promise.all([product_upload, ...promises])
    .then(([insert_product, ...spread_urls]) => {
      // Cannot Upload Product
      if (!insert_product || !insert_product["insert_product_one"]) {
        throw new Error("Failed to upload product. Please try again later");
      }
      const product_id = insert_product["insert_product_one"]["product_id"];
      const urls = spread_urls as string[];
      const images = urls
        .filter((item) => item.includes("IMAGE"))
        .map((url) => {
          return {
            product_id,
            url,
          };
        });
      const specifications = urls
        .filter((item) => item.includes("SPECIFICATION"))
        .map((url) => {
          return {
            product_id,
            url,
          };
        });
      const categories = formState.categories.map((item) => {
        return { category_id: item.value, product_id };
      });

      const variations = generateVariations(formState, product_id);

      return makeGraphQLQuery("insertProductInformation", {
        categories,
        images,
        specifications,
        variations,
      });
    })
    .then((res) => {
      console.log(res);
      if (
        !res ||
        !res["insert_products_categories"] ||
        !res["insert_product_image"] ||
        !res["insert_product_specification"]
      ) {
        throw new Error(
          "Unable to update product categories,images or specifications. Please try again later"
        );
      }
      generateSuccessToast("Success!", "Product Uploaded Successfully");
    })
    .catch((err) => {
      console.log(err.message);
      generateWarningToast(
        "Unable to upload Image",
        "Please try again later. Contact our help desk if the problem persists"
      );
    });
};

export const updateProductInformation = (
  formState: ProductFormItem,
  generateSuccessToast,
  generateWarningToast
) => {
  const {
    description,
    product_name,
    product_id,
    product_status: { value: product_status },
  } = formState;
  // 1. Update the product information
  const imageFiles = formState.images.map((item, index) => {
    return {
      file: item,
      name: `IMAGE_${index}`,
    };
  });
  const specificationFiles = formState.specifications.map((item, index) => {
    return {
      file: item,
      name: `SPECIFICATION_${index}`,
    };
  });
  const allFiles = imageFiles.concat(specificationFiles);
  const promises = allFiles.map((item) => {
    return uploadFile(item.name, item.file);
  });
  const productUploadPromise = makeGraphQLQuery(
    "updateProductAndDeleteCategories",
    {
      description,
      product_id,
      product_name,
      product_status,
    }
  );

  Promise.all([productUploadPromise, ...promises])
    .then(([update_product, ...spread_urls]) => {
      // Cannot Upload Product
      if (!update_product || !update_product["update_product"]) {
        throw new Error("Failed to upload product. Please try again later");
      }

      const urls = spread_urls as string[];
      const images = urls
        .filter((item) => item.includes("IMAGE"))
        .map((url) => {
          return {
            product_id,
            url,
          };
        });
      const specifications = urls
        .filter((item) => item.includes("SPECIFICATION"))
        .map((url) => {
          return {
            product_id,
            url,
          };
        });
      const categories = formState.categories.map((item) => {
        return { category_id: item.value, product_id };
      });

      const variations = generateVariations(formState, product_id);

      return makeGraphQLQuery("insertProductInformation", {
        categories,
        images,
        specifications,
        variations,
      });
    })
    .then((res) => {
      console.log(res);
      if (
        !res ||
        !res["insert_products_categories"] ||
        !res["insert_product_image"] ||
        !res["insert_product_specification"]
      ) {
        throw new Error(
          "Unable to update product categories,images or specifications. Please try again later"
        );
      }
      generateSuccessToast("Success!", "Product Uploaded Successfully");
    })
    .catch((err) => {
      console.log(err.message);
      generateWarningToast(
        "Unable to upload Image",
        "Please try again later. Contact our help desk if the problem persists"
      );
    });

  // 2. Update Images and Specifications
  // 3. Update Categories ( We delete everything and then just add in all the info)
};

export const determineBaseCategory = (
  variation_categories,
  variations,
  variation_sku
) => {
  const base_options = Object.keys(variation_sku);

  const base_category = variation_categories.filter((category) => {
    base_options === variations[category];
  });

  return base_category[0];
};
