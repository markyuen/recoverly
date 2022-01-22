import React from "react";
import SkeletonCard from "./SkeletonCard";

type SkeletonGridProps = {
  count: number;
};

const SkeletonGrid = ({ count }) => {
  return (
    <>
      {[...Array(count)].map((e, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
};

export default SkeletonGrid;
