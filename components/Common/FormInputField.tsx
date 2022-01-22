import React from "react";

type InputProps = {
  label: string;
  value: string;
  changeHandler: (string) => void;
  type: string;
};

const AddNewCategoryModalInput = ({
  label,
  value,
  changeHandler,
  type,
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor="first-name"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          value={value}
          name="first-name"
          id="first-name"
          type={type}
          onChange={(e) => changeHandler(e)}
          className="py-3 px-4 block w-full  focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default AddNewCategoryModalInput;
