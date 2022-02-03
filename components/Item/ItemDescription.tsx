import React, { useState } from "react";

const tabs = [
  { name: "My Account", href: "#", current: false },
  { name: "Company", href: "#", current: false },
  { name: "Team Members", href: "#", current: true },
  { name: "Billing", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

type ItemDescriptionProps = {
  Tabs: string[];
  description: string;
};

const ItemDescription = ({ Tabs, description }: ItemDescriptionProps) => {
  const [currOption, setCurrOption] = useState(Tabs[0]);

  //TODO: Create a Responsive Version ( Probably just do the entire long list )
  return (
    <div className="my-10">
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {Tabs.map((tab, index) => (
              <p
                key={index}
                className={classNames(
                  tab === currOption
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm cursor-pointer"
                )}
                aria-current={tab === currOption ? "page" : undefined}
                onClick={() => setCurrOption(tab)}
              >
                {tab}
              </p>
            ))}
          </nav>
          {currOption === "Description" && (
            <>
              <div className="my-6 prose max-w-lg prose-indigo prose-lg text-gray-500 mx-auto">
                <p className="mt-8 text-xl text-gray-500 leading-8">
                  About the Product
                </p>
                <p>{description}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDescription;
