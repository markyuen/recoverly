import React from "react";

import Categories from "../components/Category/Categories";
import ShopNav from "../components/layouts/ShopNav";
import PopularItems from "../components/Items/PopularItems";
import Image from "next/image";

const Index = () => {
  return (
    <>
      <ShopNav>
        <main className="lg:relative flex">
          <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
            <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">Minimize your cost</span>{" "}
                <span className="block text-indigo-600 xl:inline">
                  and your waste
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                Enjoy big discounts and help our local SMEs clear their excess
                inventory and returned products
              </p>
            </div>
          </div>
          <div className="hidden md:block md:w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
            <Image src="/logo.png" width={500} height={500} alt="logo" />
          </div>
        </main>
        <Categories />
        <PopularItems />
      </ShopNav>
    </>
  );
};

export default Index;
