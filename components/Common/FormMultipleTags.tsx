import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import React from "react";
import { seller_category } from "../../types/seller";

type FormMultipleTagsProps = {
  label: string;
  categories: seller_category[];
  value: seller_category[];
  dispatch: any;
  action_type: string;
  remove_type: string;
};

const FormMultipleTags = ({
  label,
  categories,
  value,
  dispatch,
  action_type,
  remove_type,
}: FormMultipleTagsProps) => {
  const handleChange = (e) => {
    if (e.target.value == -1) {
      return;
    }
    const selected_category = categories.filter(
      (item) => item.id == e.target.value
    );
    dispatch({ type: action_type, payload: selected_category });
    // console.log({
    //   type: action_type,
    //   payload: selected_category,
    // });
  };

  const valid_categories = categories.filter(
    (item) =>
      value.filter((selected_category) => selected_category.id == item.id)
        .length == 0
  );

  return (
    <div>
      <div className="w-1/2 mb-4">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <select
          id="location"
          name="location"
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue="Canada"
        >
          <option value={-1}>Select A Category</option>
          {valid_categories.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-wrap">
        {value.map((item) => (
          <div
            onClick={() => dispatch({ type: remove_type, payload: item.id })}
            key={item.id}
            className="mx-2 my-1"
          >
            <Tag
              size={"md"}
              borderRadius="full"
              variant="solid"
              colorScheme="blue"
              className="py-1 px-2"
            >
              <TagLabel>{item.name}</TagLabel>
              <TagCloseButton />
            </Tag>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormMultipleTags;
