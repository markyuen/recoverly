import Image from "next/image";
import React from "react";
import { capitaliseFirstLetterOfString } from "../../lib/string";

type CategoryCardProps = {
  name: string;
  image_url: string;
};

const CategoryCard = ({ name, image_url }: CategoryCardProps) => {
  return (
    <div className="transition ease-in-out delay-50 duration-300 cursor-pointer hover:shadow-md py-4 px-4 hover: flex flex-col items-center justify-center">
      <Image src={image_url} width={100} height={100} alt={name} />
      <p className="text-md mt-4">{capitaliseFirstLetterOfString(name)}</p>
    </div>
  );
};

export default CategoryCard;
