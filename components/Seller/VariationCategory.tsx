import React, { useState } from "react";
import {
  ADD_NEW_VARIATION_TO_FORM_STATE,
  REMOVE_VARIATION_CATEGORY_FROM_FORM_STATE,
  REMOVE_VARIATION_FROM_FORM_STATE,
} from "../../constants/seller";
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
      type: ADD_NEW_VARIATION_TO_FORM_STATE,
      payload: {
        variation_category: category,
        variation_name: value,
      },
    });
    setValue("");
  };

  const handleDelete = () => {
    dispatch({
      type: REMOVE_VARIATION_CATEGORY_FROM_FORM_STATE,
      payload: category,
    });
  };

  const handleRemoveVariation = (variation_name) => {
    dispatch({
      type: REMOVE_VARIATION_FROM_FORM_STATE,
      payload: {
        variation_name,
        variation_category: category,
      },
    });
  };

  return (
    <div className="border-dotted border py-4 px-8">
      <div className="flex justify-between items-center mb-4">
        <h2>{category}</h2>
        <svg
          onClick={handleDelete}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
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
        {variations &&
          variations.map((variation, index) => (
            <li className="my-2 flex items-center" key={index}>
              <svg
                onClick={() => handleRemoveVariation(variation)}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-4 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>{" "}
              {variation}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default VariationCategory;
