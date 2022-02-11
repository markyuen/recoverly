import React from "react";
import { ProductInformation } from "../../types/product";
import ProductCategories from "./ProductCategories";
import ProductImages from "./ProductImages";
import ProductSpecifications from "./ProductSpecifications";
import ProductVariations from "./ProductVariations";

type ProductPageProps = {
  product: ProductInformation;
};

// TODO:
// 1. Change product_id to a hashed base64value
// 2. add discount tag

const ProductPage = ({ product }: ProductPageProps) => {
  const {
    product_id,
    brand: { brand_name },
    product_images,
    product_specifications,
    product_name,
    description,
    products_categories,
    variations,
  } = product;

  return (
    <div className="w-full max-w-4xl rounded   mx-auto text-gray-800 relative md:text-left">
      <div className="md:flex items-center -mx-10">
        <ProductImages product_images={product_images} />
        <div className="w-full md:w-1/2 px-10">
          <h1 className="text-xl font-bold">{product_name}</h1>
          <p className="text-gray-700 text-sm">{brand_name}</p>
          <ProductVariations
            product_id={product_id}
            product_name={product_name}
            variations={variations}
          />
          <ProductCategories products_categories={products_categories} />
        </div>
      </div>
      <div className="my-6 prose max-w-lg prose-indigo prose-lg text-gray-500 mx-auto">
        <p className="my-8 text-xl text-gray-500 leading-8">
          About the Product
        </p>
        <p className="whitespace-pre-wrap">{description}</p>
      </div>
      <ProductSpecifications product_specifications={product_specifications} />
    </div>
  );
};

export default ProductPage;
