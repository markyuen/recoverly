import { Input } from "@chakra-ui/react";
import React from "react";
import useChakraToast from "../../hooks/useChakraToast";

type CreateVariationProps = {
  handleChange: (string) => void;
};

const CreateVariation = ({ handleChange }: CreateVariationProps) => {
  const [value, setValue] = React.useState("");
  const { generateWarningToast } = useChakraToast();
  const onSubmit = (e) => {
    if (value == "") {
      generateWarningToast("Error", "Variation Category cannot be blank");
      return;
    }
    handleChange(value);
    setValue("");
  };

  return (
    <div className="flex flex-col items-start">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter New Variation Name"
      />
      <div
        onClick={onSubmit}
        className="cursor-pointer flex items-center justify-center px-8 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 py-2 mt-4"
      >
        Create Variation
      </div>
    </div>
  );
};

export default CreateVariation;
