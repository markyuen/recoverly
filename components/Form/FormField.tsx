import React from "react";
import { FieldData } from "../../types/form";

type FormFieldProps = {
  item: FieldData;
  register: any;
};

const FormField = ({ item, register }: FormFieldProps) => {
  const { name, config, type } = item;
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        {name}
      </label>
      <div className="mt-1">
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={name}
          className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
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
