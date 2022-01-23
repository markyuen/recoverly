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
import useGraphQLQuery from "../../hooks/useQuery";

type NewCategoryProps = {
  categories: product_category[];
};

const AddNewCategoryModal = ({ categories }: NewCategoryProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { makeGraphQLRequest } = useGraphQLQuery();
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

  const submitNewCategory = (e) => {
    e.preventDefault();

    if (parent === "" && !imageFile) {
      toast({
        title: "Invalid Input",
        description: "Cover image required for main categories",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    updateImage(imageFile, null, generateItemSlugLink(categoryName)).then(
      (url) => {
        const new_category = {
          category_id: categoryId,
          category_name: categoryName,
          image_url: url,
          parent_id: parent === "" ? null : parseInt(parent),
        };

        const mutate_cb = async (data) => {
          return {
            ...data,
            category: [new_category, ...data.category],
          };
        };

        return makeGraphQLRequest(
          "insertNewCategory",
          new_category,
          mutate_cb
        ).then((res) => {
          onClose();
        });
      }
    );
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
