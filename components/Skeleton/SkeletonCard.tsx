import React from "react";
import { Skeleton, SkeletonText } from "@chakra-ui/react";

const SkeletonCard = () => {
  return (
    <div>
      <Skeleton height="180px" />
      <SkeletonText mt="4" noOfLines={2} spacing="4" />
    </div>
  );
};

export default SkeletonCard;
