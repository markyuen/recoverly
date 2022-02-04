import { Select } from "@chakra-ui/react";
import React from "react";
import { option } from "../../types/seller";

type FormSingleInputSelectProps = {
  label: string;
  options: option[];
  value: any;
  dispatch: any;
  action_type: string;
};

const FormSingleInputSelect = ({
  label,
  options,
  value,
  dispatch,
  action_type,
}: FormSingleInputSelectProps) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor="email-address"
        className="block text-sm font-medium text-gray-700 mb-4"
      >
        {label}
      </label>
      <Select
        onChange={(e) => {
          if (e.target.value === "") {
            return;
          }
          dispatch({
            type: action_type,
            payload: options.filter((item) => item.value == e.target.value)[0],
          });
        }}
        value={value.value}
        placeholder="Select Parent Category"
      >
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default FormSingleInputSelect;
