import { Select } from "@chakra-ui/react";
import React from "react";

type FormSelectOption = {
  label: string;
  value: string;
};

type FormSelectInputProps = {
  value: string;
  changeHandler: (string) => void;
  options: FormSelectOption[];
};

const FormSelectInput = ({
  value,
  changeHandler,
  options,
}: FormSelectInputProps) => {
  return (
    <Select
      onChange={(e) => changeHandler(e)}
      value={value}
      placeholder="Select Parent Category"
    >
      {options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </Select>
  );
};

export default FormSelectInput;
