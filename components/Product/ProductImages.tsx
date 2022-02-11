import React from "react";
import { product_page_file } from "../../types/product";
import ImageViewer from "../Common/ImageViewer";

type ProductImagesProps = {
  product_images: product_page_file[];
};

const ProductImages = ({ product_images }: ProductImagesProps) => {
  return (
    <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
      <ImageViewer
        images={product_images.map((item) => {
          return {
            image_url: item.url,
          };
        })}
      />
    </div>
  );
};

export default ProductImages;
