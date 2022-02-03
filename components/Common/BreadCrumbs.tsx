import React from "react";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { generateItemSlugLink } from "../../lib/string";

type pageLink = {
  name: string;
  href: string;
  current: boolean;
};

type BreadCrumbProps = {
  pages: pageLink[];
};

const BreadCrumbs = ({ pages }: BreadCrumbProps) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" passHref>
              <div className="pl-4 text-gray-400 hover:text-gray-500 cursor-pointer">
                <HomeIcon
                  className="flex-shrink-0 h-5 w-5"
                  aria-hidden="true"
                />
                <span className="sr-only">Home</span>
              </div>
            </Link>
          </div>
        </li>
        {pages &&
          pages.map((page) => {
            console.log(page);
            return (
              <li key={page.name}>
                <Link
                  href={{
                    pathname: "/category/[category_slug]",
                    query: { category_slug: generateItemSlugLink(page.name) },
                  }}
                  passHref
                >
                  <div className="flex items-center cursor-pointer">
                    <ChevronRightIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <p
                      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      aria-current={page.current ? "page" : undefined}
                    >
                      {page.name}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
