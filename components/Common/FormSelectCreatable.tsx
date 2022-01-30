import React from "react";
import CreatableSelect from "react-select/creatable";
import { brand } from "../../types/seller";

type FormSelectCreatableProps = {
  label: string;
  options: brand[];
  value: brand;
  createObject: (e) => void;
};

const FormSelectCreatable = ({
  options,
  createObject,
  label,
  value,
}: FormSelectCreatableProps) => {
  const handleChange = (e) => {
    if (!e) {
      return;
    }
    if (e.__isNew__) {
      createObject({ label: e.label, value: null });
    } else {
      createObject(e);
    }
  };

  const handleInputChange = (e) => {
    return;
  };
  return (
    <>
      <label
        htmlFor="email-address"
        className="block text-sm font-medium text-gray-700 mb-4"
      >
        {label}
      </label>
      <CreatableSelect
        isClearable
        value={value}
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={options}
      />
    </>
  );
};

export default FormSelectCreatable;
