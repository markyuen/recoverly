import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import React from "react";

type FormMultipleTagsProps = {
  label: string;
};

const FormMultipleTags = ({ label }: FormMultipleTagsProps) => {
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
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue="Canada"
        >
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </select>
      </div>
      <ul>
        <Tag
          size={"md"}
          key={"md"}
          borderRadius="full"
          variant="solid"
          colorScheme="blue"
        >
          <TagLabel>Green</TagLabel>
          <TagCloseButton />
        </Tag>
      </ul>
    </div>
  );
};

export default FormMultipleTags;
