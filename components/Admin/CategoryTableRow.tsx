import { Button, Select, toast, useToast } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { updateImage } from "../../lib/s3";
import { fetcherWithBody } from "../../lib/swr";
import { product_category } from "../../types/admin";
import CategoryImageUpload from "./CategoryImageUpload";
import { updateCategoryInformation } from "../../queries/updateCategoryInformation";
import { deleteSingleCategory } from "../../queries/deleteSingleCategory";
import { generateItemSlugLink } from "../../lib/string";
import { mutate } from "swr";
import { getCategoriesAndParent } from "../../queries/getCategoriesAndParent";

type CategoryTableRowProps = {
  category: product_category;
  all_categories: product_category[];
};

const CategoryTableRow = ({
  category,
  all_categories,
}: CategoryTableRowProps) => {
  const { category_name, category_id, parent_id, image_url } = category;
  const toast = useToast();
  const initial_parent_id = parent_id ? parent_id.toString() : "";
  const [parent, setParent] = useState();
  const [image, setImageUrl] = useState(image_url);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState(category_name);

  const deleteCategory = () => {
    fetcherWithBody(`/api/graphql/deleteSingleCategory`, {
      query: deleteSingleCategory,
      variables: {
        category_id,
      },
    }).then((res) => {
      if (res.errors) {
        const errors = "Error: " + res.errors[0].message;
        toast({
          title: "Error Encountered",
          description: errors,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      } else {
        mutate(
          [
            "/api/graphql/getCategoriesAndParent",
            {
              query: getCategoriesAndParent,
            },
          ],
          async (data) => {
            return {
              ...data,
              category: all_categories.filter(
                (cat) => cat.category_id !== category_id
              ),
            };
          },
          false
        );
        toast({
          title: "Success!",
          description: "Category succesfully deleted",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    });
  };

  const submitNewChanges = () => {
    updateImage(imageFile, image_url, generateItemSlugLink(category_name))
      .then((url) =>
        fetcherWithBody(`/api/graphql/updateCategoryInformation`, {
          query: updateCategoryInformation,
          variables: {
            category_id,
            category_name: name,
            image_url: url,
            parent_id: parent === "" ? null : parseInt(parent),
          },
        })
      )
      .then((res) => {
        if (res.errors) {
          const errors = "Error: " + res.errors[0].message;
          toast({
            title: "Error Encountered",
            description: errors,
            status: "warning",
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Success!",
            description: "We've succesfully updated category information.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Select
          onChange={(e) => setParent(e.target.value)}
          value={parent}
          placeholder="Select Parent Category"
        >
          {all_categories.map((item, index) => (
            <option key={index} value={item.category_id.toString()}>
              {item.category_name}
            </option>
          ))}
        </Select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <CategoryImageUpload image_url={image} onChange={setImageFile} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Button onClick={submitNewChanges}>Commit Changes</Button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Button onClick={deleteCategory}>Delete</Button>
      </td>
    </tr>
  );
};

export default CategoryTableRow;
