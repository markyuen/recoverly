import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import SpinnerWithMessage from "../../components/Common/SpinnerWithMessage";
import ShopNav from "../../components/layouts/ShopNav";
import ProductPage from "../../components/Product/ProductPage";
import { fetcherWithBody } from "../../lib/swr";
import getProductInformation from "../../queries/getProductInformation";

const Index = () => {
  const router = useRouter();
  const { product_id } = router.query;

  const { data, error } = useSWR(
    [
      "/api/graphql/getProductInformation",
      {
        query: getProductInformation,
        variables: {
          product_id,
        },
      },
    ],
    fetcherWithBody
  );

  console.log(data);

  if (!data) {
    return (
      <ShopNav>
        <SpinnerWithMessage label="Downloading Product Information" />
      </ShopNav>
    );
  }

  return (
    <ShopNav>
      <ProductPage product={data.product[0]} />
    </ShopNav>
  );
};

export default Index;
