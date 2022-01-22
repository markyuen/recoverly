import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { mutate } from "swr";
import { updateImage } from "../../lib/s3";
import { product_category } from "../../types/admin";
import AddNewCategoryModalInput from "../Common/FormInputField";
import FormSelectInput from "../Common/FormSelectInput";
import { insertNewCategory } from "../../queries/insertNewCategory";
import { fetcherWithBody } from "../../lib/swr";
import { generateItemSlugLink } from "../../lib/string";
import { getCategoriesAndParent } from "../../queries/getCategoriesAndParent";

type NewCategoryProps = {
  categories: product_category[];
};

const AddNewCategoryModal = ({ categories }: NewCategoryProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [categoryName, setCategoryName] = useState("");
  const [parent, setParent] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const categoryId =
    categories.reduce((acc, val) => {
      return Math.max(acc, val.category_id);
    }, 0) + 1;

  const options = categories.map((item) => {
    return {
      label: item.category_name,
      value: item.category_id.toString(),
    };
  });

  const updateImageFile = (e) => {
    setImageFile(e.target.files[0]);
  };

  const updateParent = (e) => {
    setParent(e);
  };

  const updateCategoryName = (e) => {
    setCategoryName(e.target.value);
  };

  const uploadImage = () => {
    updateImage(imageFile, null).then((url) => {
      fetcherWithBody(`/api/graphql/insertNewCategory`, {
        query: insertNewCategory,
        variables: {
          category_id: categoryId,
          category_name: categoryName,
          image_url: url,
          parent_id: parent === "" ? null : parseInt(parent),
        },
      });
    });
  };

  const submitNewCategory = (e) => {
    e.preventDefault();

    updateImage(imageFile, null, generateItemSlugLink(categoryName))
      .then((url) => {
        return fetcherWithBody(`/api/graphql/insertNewCategory`, {
          query: insertNewCategory,
          variables: {
            category_id: categoryId,
            category_name: categoryName,
            image_url: url,
            parent_id: parent === "" ? null : parseInt(parent),
          },
        });
      })
      .then((res) => {
        console.log(res);
        if (!res || !res.insert_category_one) {
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
          mutate(
            [
              "/api/graphql/getCategoriesAndParent",
              {
                query: getCategoriesAndParent,
              },
            ],
            async (data) => {
              const newCategory = {
                category_id: categoryId,
                category_name: categoryName,
                image_url: res.insert_category_one.image_url,
                parent_id: parent === "" ? null : parseInt(parent),
              };

              return {
                ...data,
                category: [...data.category, newCategory],
              };
            },
            false
          );
          onClose();
        }
      });
  };

  return (
    <div>
      <Button onClick={onOpen}>Add a new category</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={submitNewCategory}
              className="grid grid-cols-1 gap-y-6"
            >
              <AddNewCategoryModalInput
                label="Category Name"
                changeHandler={updateCategoryName}
                value={categoryName}
                type="text"
              />
              <FormSelectInput
                value={parent}
                changeHandler={updateParent}
                options={options}
              />
              <AddNewCategoryModalInput
                label="Cover Image"
                changeHandler={updateImageFile}
                value={null}
                type="file"
              />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitNewCategory}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddNewCategoryModal;
