import React from "react";
import ApprovalTableRow from "./ApprovalTableRow";
import { seller } from "../../types/admin";

type ApprovalTableBodyProps = {
  sellers: seller[];
};

const ApprovalTableBody = ({ sellers }: ApprovalTableBodyProps) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {
        sellers.map((seller, index) => {
          return <ApprovalTableRow key={index} seller={seller} />;
        })
      }
    </tbody>
  );
};

export default ApprovalTableBody;
