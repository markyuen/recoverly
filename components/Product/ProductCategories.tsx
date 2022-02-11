import { Tag } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { generateItemSlugLink } from "../../lib/string";
import { product_page_category } from "../../types/product";

type ProductCategoryProps = {
  products_categories: product_page_category[];
};

const ProductCategories = ({ products_categories }: ProductCategoryProps) => {
  return (
    <>
      <p className="mt-4">Tagged Categories: </p>
      {products_categories &&
        products_categories.map(({ category: { category_name } }, index) => {
          return (
            <Tag
              variant="solid"
              colorScheme="teal"
              key={index}
              className="mr-2 mb-4"
            >
              <Link
                href={{
                  pathname: "/category/[category_slug]",
                  query: {
                    category_slug: generateItemSlugLink(category_name),
                  },
                }}
              >
                {category_name}
              </Link>
            </Tag>
          );
        })}
    </>
  );
};

export default ProductCategories;
