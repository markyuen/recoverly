import { ProductFormItem } from "../types/seller";
import { makeGraphQLQuery } from "./GraphQL";
import { uploadFile } from "./s3";

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
    current_price: formState.current_price,
    description: formState.description,
    number_in_stock: formState.number_in_stock,
    product_name: formState.product_name,
    user_id: formState.seller_id.value,
    usual_retail_price: formState.usual_retail_price,
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
      return makeGraphQLQuery("insertProductInformation", {
        categories,
        images,
        specifications,
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
    current_price: ind_current_price,
    number_in_stock,
    usual_retail_price: ind_usual_retail_price,
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
      ind_current_price,
      ind_usual_retail_price,
      number_in_stock,
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
      return makeGraphQLQuery("insertProductInformation", {
        categories,
        images,
        specifications,
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