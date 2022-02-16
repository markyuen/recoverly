import React from "react";
import ShopNav from "../components/layouts/ShopNav";
import Image from "next/image";
import Link from 'next/link';

const SellOnRecoverly = () => {
  return (
    <ShopNav>
      <div className="flex flex-row justify-around">
        <div className="flex flex-col justify-center">
          <h1 className="font-bold text-dark-blue-recoverly text-3xl">
            Sell on Recoverly
          </h1>
          <p className="text-gray-800 max-w-md break-words">
            Recoup your capital from your excess inventory and returned eCommerce Goods anonymously
          </p>
          <div className="mt-6">
              <Link href="/about">
              <button className="bg-dark-blue-recoverly hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Learn More About Recoverly</button>
              </Link>
          </div>
          <h1 className="font-bold text-dark-blue-recoverly text-3xl mt-6">
            3 Simple Steps to Sign Up As a Seller
          </h1>
          <ul className="list-disc ml-6">
              <li className="p-2">Sign up for an account from the navigation bar above</li>
              <li className="p-2">Navigate to "Your Account" and fill in few short details</li>
              <li className="p-2">Get approved and begin listing your products</li>
          </ul>
        </div>
        <div>
          <Image
            src="/Logo Round Inverse for Dark BG (Mock-up).png"
            width="350"
            height="350"
          ></Image>
        </div>
      </div>
    </ShopNav>
  );
};

export default SellOnRecoverly;
