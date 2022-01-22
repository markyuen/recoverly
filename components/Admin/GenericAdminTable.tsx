import React from "react";
import Header from "../Common/Header";

type GenericAdminTableProps = {
  fields: string[];
};

const GenericTableHeader = ({ fields }) => {
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

const GenericAdminTable = ({ fields, children, title }) => {
  return (
    <>
      <Header name={title} />
      <div className="mt-4" />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <GenericTableHeader fields={fields} />
                {children}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenericAdminTable;
