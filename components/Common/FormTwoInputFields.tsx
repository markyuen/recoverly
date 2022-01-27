import React from "react";

type FormTwoInputFieldsProps = {
  first_label: string;
  second_label: string;
  first_placeholder: string;
  second_placeholder: string;
  first_type: string;
  second_type: string;
  dispatch: any;
  first_action_type: string;
  second_action_type: string;
  first_value: any;
  second_value: any;
};

const FormTwoInputFields = ({
  first_label,
  first_placeholder,
  first_type,
  second_label,
  second_placeholder,
  second_type,
  dispatch,
  first_action_type,
  second_action_type,
  first_value,
  second_value,
}: FormTwoInputFieldsProps) => {
  const handleChange = (e, action_type) => {
    dispatch({
      type: action_type,
      payload: e.target.value,
    });
  };
  return (
    <div className="grid grid-cols-6 gap-6">
      <div className="col-span-6 sm:col-span-3">
        <label className="block text-sm font-medium text-gray-700">
          {first_label}
        </label>
        <input
          type={first_type}
          name="first-name"
          id="first-name"
          value={first_value}
          onChange={(e) => handleChange(e, first_action_type)}
          placeholder={first_placeholder}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label className="block text-sm font-medium text-gray-700">
          {second_label}
        </label>
        <input
          type={second_type}
          value={second_value}
          onChange={(e) => handleChange(e, second_action_type)}
          placeholder={second_placeholder}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default FormTwoInputFields;
