import React from "react";

type FormTextAreaProps = {
  label: string;
  description: string;
  placeholder: string;
  dispatch: any;
  action_type: string;
  value: string;
};

const FormTextArea = ({
  label,
  description,
  placeholder,
  action_type,
  dispatch,
  value,
}: FormTextAreaProps) => {
  const handleChange = (e) => {
    dispatch({
      type: action_type,
      payload: e.target.value,
    });
  };

  return (
    <div>
      <label
        htmlFor="about"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <p className="my-2 text-xs text-gray-500">{description}</p>
        <textarea
          id="about"
          name="about"
          rows={3}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-4"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FormTextArea;
