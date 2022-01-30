import { Spinner } from "@chakra-ui/react";
import React from "react";

type SpinnerWithMessageProps = {
  label: string;
};

const SpinnerWithMessage = ({ label }: SpinnerWithMessageProps) => {
  return (
    <div className="flex items-center my-40  justify-center">
      <div className="flex flex-col items-center ">
        <p className="mb-10">{label}...</p>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    </div>
  );
};

export default SpinnerWithMessage;
