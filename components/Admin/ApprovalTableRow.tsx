import { Switch } from "@chakra-ui/react";
import React, { useState } from "react";

import { seller } from "../../types/admin";
import { makeGraphQLQuery } from "../../lib/GraphQL";

type ApprovalTableRowProps = {
  seller: seller;
};

const ApprovalTableRow = ({ seller }: ApprovalTableRowProps) => {
  const { user_id, company_name, acra_uen, address, contact_name, contact_email, stripe_id, verified, } = seller;
  const [prevStatus, setPrevStatus] = useState(verified);
  const [currStatus, setCurrStatus] = useState(verified);

  const handleChange = () => {
    setPrevStatus(currStatus);
    setCurrStatus(!currStatus);
  };

  const confirmUpdate = async () => {
    if (prevStatus == currStatus) {
      alert(`No changes made for ${company_name}. Please select a new status.`);
      return;
    }
    setPrevStatus(currStatus);
    await makeGraphQLQuery("updateSellerStatus", { "user_id": user_id, "verified": currStatus, });
    alert(`${company_name} status updated.`);
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{company_name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{acra_uen}</td>
      <td className="px-6 py-4 whitespace-nowrap">{address}</td>
      <td className="px-6 py-4 whitespace-nowrap">{contact_name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{contact_email}</td>
      <td className="px-6 py-4 whitespace-nowrap">{stripe_id}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Switch
          onChange={handleChange}
          size="md"
          isChecked={currStatus === true}
        />
      </td>
      <td className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
        <button onClick={confirmUpdate} className="text-sm">
          Update
        </button>
      </td>
    </tr>
  );
};

export default ApprovalTableRow;
