import React from "react";

type FormInputWithLeadingProps = {
  label: string;
  leading_text: string;
  placeholder: string;
};

const FormInputWithLeading = ({
  label,
  leading_text,
  placeholder,
}: FormInputWithLeadingProps) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-3 sm:col-span-2">
        <label
          htmlFor="company-website"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            {leading_text}
          </span>
          <input
            type="text"
            name="company-website"
            id="company-website"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default FormInputWithLeading;
