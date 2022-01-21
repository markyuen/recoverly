import React from "react";

const ApprovalTableHeader = ({ fields }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {fields.map((item, index) => (
          <th
            key={index}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default ApprovalTableHeader;
