import React from "react";
import { product_page_file } from "../../types/product";
import PDFViewer from "../Common/PDFViewer";

type ProductSpecificationsProps = {
  product_specifications: product_page_file[];
};

const ProductSpecifications = ({
  product_specifications,
}: ProductSpecificationsProps) => {
  return (
    <>
      {product_specifications.length > 0 && (
        <div className="my-6 prose max-w-lg prose-indigo prose-lg text-gray-500 mx-auto">
          <p className="my-8 text-xl text-gray-500 leading-8">
            Product Specifications
          </p>
          <PDFViewer pdfs={product_specifications} />
        </div>
      )}
    </>
  );
};

export default ProductSpecifications;
