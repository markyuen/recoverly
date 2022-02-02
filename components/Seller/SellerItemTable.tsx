import React, { useEffect, useState } from "react";
import { useUserRole } from "../../context/UserRoleContext";
import useGraphQLQuery from "../../hooks/useQuery";
import { makeGraphQLQuery } from "../../lib/GraphQL";
import { seller_item } from "../../types/seller";
import GenericAdminTable from "../Admin/GenericAdminTable";
import SpinnerWithMessage from "../Common/SpinnerWithMessage";
import SkeletonGrid from "../Skeleton/SkeletonGrid";
import SkeletonPage from "../Skeleton/SkeletonPage";
import SellerItemRow from "./SellerItemRow";

const SellerItemTable = () => {
  const [items, setItems] = useState<seller_item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { userId } = useUserRole();

  useEffect(() => {
    makeGraphQLQuery("getMerchantItems", { seller_id: userId })
      .then((res) => {
        if (!res || !res["product"]) {
          throw new Error("Failed to fetch items");
        }
        setItems(res["product"]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const removeProduct = (product_id) => {
    setItems((items) => items.filter((item) => item.product_id !== product_id));
  };

  if (loading) {
    return <SpinnerWithMessage label="Extracting Data from Database..." />;
  }

  return (
    <>
      <GenericAdminTable
        title="Current Stock"
        fields={["Name", "Brand", "Description", "Categories", "Edit"]}
      >
        {items.map((item, index) => {
          return (
            <SellerItemRow
              removeProduct={removeProduct}
              key={index}
              item={item}
            />
          );
        })}
      </GenericAdminTable>
    </>
  );
};

export default SellerItemTable;
