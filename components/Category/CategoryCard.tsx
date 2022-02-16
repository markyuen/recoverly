import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import {
  capitaliseFirstLetterOfString,
  generateItemSlugLink,
} from "../../lib/string";

type CategoryCardProps = {
  name: string;
  image_url: string;
};

const CategoryCard = ({ name, image_url }: CategoryCardProps) => {
  const router = useRouter();
  const slug = generateItemSlugLink(name);

  const handleClick = () => {
    router.push({
      pathname: "/category/[category_slug]",
      query: { category_slug: slug },
    });
  };
  return (
    <div
      id="category"
      onClick={handleClick}
      className="transition ease-in-out delay-50 duration-300 cursor-pointer hover:shadow-md py-4 px-4 hover: flex flex-col items-center justify-center col-span-1"
    >
      <Image src={image_url} width={200} height={200} alt={name} />
      <p className="text-md mt-4">{capitaliseFirstLetterOfString(name)}</p>
    </div>
  );
};

export default CategoryCard;
