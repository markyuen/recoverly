import React from "react";
import { useForm } from "react-hook-form";
import { FieldData } from "../../types/form";
import FormField from "./FormField";

type FormContainerProps = {
  fields: FieldData[];
  onSubmit: any;
  cta: string;
};

const FormContainer = ({ onSubmit, fields, cta }: FormContainerProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, index) => {
        return <FormField item={item} key={index} register={register} />;
      })}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
        >
          {cta}
        </button>
      </div>
    </form>
  );
};

export default FormContainer;
