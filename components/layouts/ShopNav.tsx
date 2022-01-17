/* This example requires Tailwind CSS v2.0+ */

import { Disclosure, Menu, Transition } from "@headlessui/react";

import NavBar from "../nav/NavBar";

export default function ShopNav({ children }) {
  return (
    <>
      <div className="min-h-full">
        <NavBar />
        <div className="mx-auto max-w-6xl">{children}</div>
      </div>
    </>
  );
}
