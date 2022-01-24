import { useRouter } from "next/router";
import React from "react";
import { ItemProp } from "../../types/items";
import { getItem } from "../api/get-item";
import Image from "next/image";
import InternalLink from "../../components/Common/Link";
import ShopNav from "../../components/layouts/ShopNav";
import QuantityButton from "../../components/Product/QuantityButton";

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
    <ShopNav>
      <div className="w-full max-w-4xl rounded   mx-auto text-gray-800 relative md:text-left">
        <InternalLink
          type="customer"
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
            <QuantityButton data={data} />
          </div>
        </div>
      </div>
    </ShopNav>
  );
};

export async function getStaticPaths() {
  const paths = Array.from({ length: 20 }, (_, i) => i + 1).map((item) => {
    return {
      params: {
        id: item.toString(),
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
