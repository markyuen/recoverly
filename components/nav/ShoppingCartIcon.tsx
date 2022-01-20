{
  /*  */
}

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useCart } from "../../context/CartContext";
import ShoppingCartItem from "./ShoppingCartItem";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ShoppingCartIcon() {
  const { cartItems } = useCart();
  console.log(cartItems);
  return (
    <Menu as="div" className="relative inline-block text-left z-10">
      <div>
        <Menu.Button className="inline-flex justify-center w-full  px-4 py-2  text-sm font-medium text-gray-700  ">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItems.length > 0 ? (
              <p className="-ml-2 -mt-1 text-blue-5 border-black-200 ">
                {cartItems.length}
              </p>
            ) : null}
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-4 px-4">
          {cartItems.map((item, index) => (
            <ShoppingCartItem key={index} item={item} />
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
