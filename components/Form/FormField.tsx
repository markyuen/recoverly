import React from "react";
import { FieldData } from "../../types/form";

type FormFieldProps = {
  item: FieldData;
  register: any;
};

const FormField = ({ item, register }: FormFieldProps) => {
  const { name, config, type } = item;
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm my-2 font-medium text-gray-700"
      >
        {name}
      </label>
      <div className="mt-1">
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={name}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register(name)}
          placeholder={name}
          {...config}
        />
      </div>
    </div>
  );

  //   <input defaultValue={name} {...register("example")} />;
};

export default FormField;
