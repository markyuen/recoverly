import React from "react";

type FormInputProps = {
  type: string;
  onChange: (any) => void;
  value: string;
  label: string;
  disabled?: boolean;
};

const FormInput = ({ type, value, onChange, label, disabled=false }: FormInputProps) => {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:border-gray-200 sm:pt-5">
      <label
        htmlFor="username"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        {label}
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <div className="max-w-lg flex rounded-md shadow-sm">
          <input
            value={value}
            type={type}
            onChange={onChange}
            id="username"
            autoComplete="username"
            className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default FormInput;
