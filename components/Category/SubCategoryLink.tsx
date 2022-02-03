import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { generateItemSlugLink } from "../../lib/string";

type SubCategoryLinkProps = {
  name: string;
};

const SubCategoryLink = ({ name }) => {
  const router = useRouter();
  const slug = generateItemSlugLink(name);

  const handleClick = () => {
    router.push({
      pathname: "/category/[category_slug]",
      query: { category_slug: slug },
    });
  };
  return (
    <div className="mx-2 my-2 hover:underline cursor-pointer">
      <Link
        href={{
          pathname: "/category/[category_slug]",
          query: { category_slug: slug },
        }}
        passHref
      >
        <p>{name}</p>
      </Link>
    </div>
  );
};

export default SubCategoryLink;
