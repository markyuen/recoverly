import React, { useState } from "react";
import useChakraToast from "../../hooks/useChakraToast";

type VariationCategoryProps = {
  category: string;
  variations: string[];
  dispatch: any;
  action_type: string;
};

const VariationCategory = ({
  category,
  variations,
  dispatch,
  action_type,
}: VariationCategoryProps) => {
  const [value, setValue] = useState("");
  const { generateWarningToast } = useChakraToast();

  const handleSubmit = () => {
    if (value === "") {
      generateWarningToast("Error", "Variation Category Name cannot be blank");
      return;
    }
    dispatch({
      type: action_type,
      payload: {
        category,
        variation: value,
      },
    });
    setValue("");
  };

  return (
    <div className="border-dotted border py-4 px-8">
      <h2>{category}</h2>
      <div className="flex items-center">
        <input
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border mr-5 rounded-md py-2 px-4"
          placeholder="Enter New Variation Type"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <svg
          onClick={handleSubmit}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <ul>
        {variations.map((variation, index) => (
          <li key={index}>{variation}</li>
        ))}
      </ul>
    </div>
  );
};

export default VariationCategory;
