import { Select, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
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
    console.log(e.target.value);
    const selected_category = categories.filter(
      (item) => item.value == e.target.value
    );

    dispatch({ type: action_type, payload: selected_category });
  };

  const valid_categories = categories.filter(
    (item) =>
      value.filter((selected_category) => selected_category.value == item.value)
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
        <Select
          id="location"
          name="location"
          onChange={handleChange}
          placeholder="Select a Category"
        >
          {valid_categories.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            );
          })}
        </Select>
      </div>
      <div className="flex flex-wrap">
        {value.map((item) => (
          <div
            onClick={() => dispatch({ type: remove_type, payload: item.value })}
            key={item.value}
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
