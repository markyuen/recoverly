import { Button, Tag } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import useChakraToast from "../../hooks/useChakraToast";
import { makeGraphQLQuery } from "../../lib/GraphQL";
import { seller_item } from "../../types/seller";
import LinkContainer from "../Common/LinkContainer";

type SellerItemProps = {
  item: seller_item;
  removeProduct: (product_id: string) => void;
};

const SellerItemRow = ({ item, removeProduct }: SellerItemProps) => {
  const {
    product_name,
    description,
    ind_current_price,
    ind_usual_retail_price,
    number_in_stock,
    product_status,
    products_categories,
    product_id,
    brand: { brand_name },
  } = item;

  const { generateSuccessToast, generateWarningToast } = useChakraToast();

  const handleDelete = (productID) => {
    makeGraphQLQuery("deleteProduct", { productID })
      .then((res) => {
        if (res.errors) {
          const combined_errors = res.errors
            .map((item) => `-${item.message}`)
            .join("\n");
          throw new Error(combined_errors);
        }
        removeProduct(productID);
        generateSuccessToast("Success!", `${product_name} has been deleted`);
      })
      .catch((err) => {
        generateWarningToast("Error", err.message);
      });
  };

  return (
    <tr>
      <td className="px-6 py-4 ">{product_name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{brand_name}</td>
      <td className="px-6 py-4 ">
        {description.length < 100
          ? description
          : description.slice(0, 100) + "..."}
      </td>
      <td className="py-4 whitespace-nowrap">{number_in_stock}</td>
      <td className="py-4 whitespace-nowrap">{ind_current_price}</td>
      <td className="py-4 whitespace-nowrap">
        {products_categories &&
          products_categories.map(({ category }, index) => {
            return (
              <Tag className="mx-2" key={index}>
                {category.category_name}
              </Tag>
            );
          })}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col">
          <Link
            href={{
              pathname: "/seller/edit_item",
              query: { product_id },
            }}
            passHref
          >
            <Button>Edit</Button>
          </Link>
          <Button onClick={() => handleDelete(product_id)} className="mt-4">
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default SellerItemRow;
