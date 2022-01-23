import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import ShopNav from "../layouts/ShopNav";

const SkeletonPage = () => {
  return (
    <ShopNav>
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </ShopNav>
  );
};

export default SkeletonPage;
