import { Switch } from "@chakra-ui/react";

import React, { useState } from "react";
import { seller } from "../../types/admin";

type ApprovalTableRowProps = {
  seller: seller;
};

const ApprovalTableRow = ({ seller }: ApprovalTableRowProps) => {
  const { name, status, contact_number } = seller;
  const [newStatus, setStatus] = useState(status);

  const handleChange = () => {
    setStatus(newStatus === "Approved" ? "Pending" : "Approved");
  };

  const confirmUpdate = () => {
    if (status == newStatus) {
      alert("No changes made. Please select a new status.");
    }
    console.log("-----UPDATING STATUS-----");
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{name}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Switch
          onChange={handleChange}
          size="md"
          isChecked={newStatus === "Approved"}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{contact_number}</td>

      <td className="py-4 whitespace-nowrap">
        <button onClick={confirmUpdate} className="text-sm">
          Update
        </button>
      </td>
    </tr>
  );
};

export default ApprovalTableRow;
