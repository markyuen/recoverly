import { useRouter } from "next/router";
import React from "react";
import { ItemProp } from "../../types/items";
import { getCategories } from "../api/get-category";
import { getItem } from "../api/get-item";
import Image from "next/image";
import InternalLink from "../../components/Common/Link";

type ProductProps = {
  data: ItemProp;
};

const Product = ({ data }: ProductProps) => {
  const router = useRouter();

  if (!data) {
    return <div>loading....</div>;
  }

  const { title, image, description, price } = data;

  return (
    <div className="w-full max-w-4xl rounded   mx-auto text-gray-800 relative md:text-left">
      <InternalLink
        name="← View All Categories"
        href="/"
        styling="cursor-pointer text-blue-400 hover:underline transition duration-75 mb-10"
      />
      <div className="md:flex items-center -mx-10">
        <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
          <Image
            src={image}
            className="w-full relative"
            width={200}
            height={200}
            alt={title}
          />
        </div>
        <div className="w-full md:w-1/2 px-10">
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-sm">SGD$ {price}</p>
          <button
            type="button"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const categories = await getCategories();
  const paths = categories.map((item, index) => {
    return {
      params: {
        id: index.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const data = await getItem(id);

  return {
    props: {
      data: data.length > 0 ? data[0] : [],
    },
  };
}

export default Product;
