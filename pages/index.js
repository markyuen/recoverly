import React from "react";
import fetch from 'isomorphic-unfetch';

import Categories from "../components/Category/Categories";
import { getCategories } from "./api/get-category";
import ShopNav from "../components/layouts/ShopNav";

const Index = ({ categories }) => {
  return (
    <>
      <ShopNav>
        <Categories categories={categories} />
      </ShopNav>
    </>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const categories = await getCategories();

  // const body = context.query;

  // // TODO properly use `state` from Stripe OAuth
  // if (body.code) {
  //   body.scope = 'read_write';
  //   let response;
  //   try {
  //     response = await fetch(
  //       process.env.NEXT_PUBLIC_BASE_URL + '/api/verifyStripe',
  //       {
  //         method: 'POST',
  //         body: JSON.stringify(body),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     ).then((res) => res.json());
  //     console.log(response);
  //   } catch (error) {
  //     // TODO: throw proper error if Stripe OAuth fails
  //   }
  //   // return {
  //   //   redirect: {
  //   //     destination: "/",
  //   //     permanent: false,
  //   //   }
  //   // };
  // }

  return { props: { categories } };
};
