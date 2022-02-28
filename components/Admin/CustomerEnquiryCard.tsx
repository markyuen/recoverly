import { Button } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { mutate } from "swr";
import useChakraToast from "../../hooks/useChakraToast";
import getCustomerQueries from "../../queries/getCustomerQueries";
import updateCustomerQueryStatus from "../../queries/updateCustomerQueryStatus";

type CustomerEnquiryInformation = {
  message: string;
  enquiry_id: number;
  customer: {
    full_name: string;
    customer_email: string;
  };
  resolved: boolean;
  display: boolean;
};

type CardProps = {
  item: CustomerEnquiryInformation;
};

const CustomerEnquiryCard = ({ item }: CardProps) => {
  const {
    customer: { full_name, customer_email },
    message,
    enquiry_id,
    resolved,
  } = item;
  const { generateSuccessToast } = useChakraToast();

  const updateStatusOfInquiry = () => {
    axios
      .post("/api/customer/updateCustomerQueryStatus", {
        query: updateCustomerQueryStatus,
        variables: {
          resolved: !resolved,
          enquiry_id: enquiry_id,
        },
      })
      .then((res) => {
        generateSuccessToast(
          "Success",
          "Succesfully updated the status of the enquiry"
        );
        mutate({
          url: "/api/customer/getCustomerQueries",
          body: {
            query: getCustomerQueries,
          },
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="rounded-lg">
      <div className="mt-8">
        <h3 className="text-lg font-medium">{full_name}</h3>

        <p>{customer_email}</p>
        <div className="py-2">
          <Button onClick={() => updateStatusOfInquiry()}>
            {!resolved ? "Resolve Query" : "Open Inquiry Again"}
          </Button>
        </div>

        <p className="mt-2 text-sm text-gray-500">Enquiry : {message}</p>
      </div>
    </div>
  );
};

export default CustomerEnquiryCard;
