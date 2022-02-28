import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import useSWR from "swr";
import CustomerEnquiryCard from "../../components/Admin/CustomerEnquiryCard";
import Header from "../../components/Common/Header";
import ShopNav from "../../components/layouts/ShopNav";
import { fetcherWithBody } from "../../lib/swr";
import getCustomerQueries from "../../queries/getCustomerQueries";

const Inquiry = () => {
  const { data, error } = useSWR(
    {
      url: "/api/customer/getCustomerQueries",
      body: {
        query: getCustomerQueries,
      },
    },
    fetcherWithBody
  );

  const [onlyDisplayOpen, setOnlyDisplayOpen] = useState(false);

  return (
    <ShopNav>
      <Header name="Inquiries" />
      <div className="my-4 mx-2">
        <Button onClick={() => setOnlyDisplayOpen(!onlyDisplayOpen)}>
          Only Display Open Cases
        </Button>
      </div>
      {data && (
        <p>
          Currently {data[0].enquiry.filter((item) => !item.resolved).length}{" "}
          open cases
        </p>
      )}

      <div className="grid grid-cols-2 mx-4 space-y-4">
        {data &&
          data[0].enquiry
            .sort((a, b) => b.enquiry_id - a.enquiry_id)
            .map((item) => {
              return {
                ...item,
                display: onlyDisplayOpen ? !item.resolved : true,
              };
            })
            .filter((item) => item.display)
            .map((item, index) => {
              return <CustomerEnquiryCard key={index} item={item} />;
            })}
      </div>
    </ShopNav>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: ["admin"],
    },
  };
}

export default Inquiry;
