/* This example requires Tailwind CSS v2.0+ */

import { Disclosure, Menu, Transition } from "@headlessui/react";
import Footer from "../footer/FooterContainer";

import NavBar from "../nav/NavBar";

export default function ShopNav({ children }) {
  return (
    <>
      <div className="min-h-full">
        <NavBar />
        <div className="max-w-4xl px-4 xl:max-w-6xl mx-auto mt-8">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
