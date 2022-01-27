import React, { useState } from "react";

type FormSingleInputProps = {
  label: string;
  type: string;
  dispatch: any;
  action_type: string;
  value: any;
};

const FormSingleInput = ({
  label,
  type,
  dispatch,
  action_type,
  value,
}: FormSingleInputProps) => {
  const handleChange = (e) => {
    dispatch({
      type: action_type,
      payload: e.target.value,
    });
  };

  return (
    <div className="w-3/4">
      <label
        htmlFor="email-address"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        onChange={handleChange}
        type={type}
        value={value}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-4"
      />
    </div>
  );
};

export default FormSingleInput;
