import React from "react";
import Header from "../components/Common/Header";
import ShopNav from "../components/layouts/ShopNav";
import ProtectedRoute from "../components/route/ProtectedRoute";
import {FaGlobeAsia} from 'react-icons/fa'; 
import {BsShopWindow, BsPeople} from 'react-icons/bs'; 


const About = () => {
  return (
    <ProtectedRoute>
      <ShopNav>
        <h1 className="text-5xl pt-4 ml-4 lg:px-0 font-bold text-black text-center">Our Why</h1>
        <p className="ml-6 mt-4 text-center">
          SMEs face an issue with their monetary and resource capital locked up
          in inventory due to (1) product returns from eCommerce transactions
          which they struggle to sell; and (2) excess inventory.{" "}
        </p>

        <p className="ml-6 mt-4 text-center">
          The growth of eCommerce has brought about growing pains. While 5 - 10%
          of brick-and-mortar transactions are returned, due to practices such
          as bracketing, eCommerce transactions have a higher return rate of 15
          - 40%. This is not only environmentally inefficient (with returns
          estimated to contribute 5bn pounds of waste in the U.S. alone) but
          also capital inefficient as 75% of these products are not properly
          liquidated.
        </p>

        <p className="ml-6 mt-4 text-center">
          This problem likewise afflicts excess inventory, with studies showing
          that even in well-run firms, 20 – 30% of inventory is excess.
        </p>

        <p className="ml-6 mt-4 text-center">
          This implies the existence of a large amount of functional goods which
          are simply sitting on the shelves of our local SMEs.{" "}
        </p>

        <div className="border-4 border-black mt-4 text-center">
          <Header name="Unlocking Southeast Asia's Resource and Monetary Capital" />

          <p className="ml-6 mt-4 mb-4">
            Recognising this, Recoverly provides Southeast Asia’s SMEs the tools
            and platform to unlock their excess inventory and returned products.
            <br></br>
            <br></br>
            More importantly, our goal is to re-circulate as many of these
            unused products, minimizing our region’s environmental waste while
            maximizing our SMEs’ monetary capital.
          </p>
        </div>
        
        <h1 className="text-5xl pt-4 ml-4 lg:px-0 font-bold text-black text-center">Something for Everyone</h1>
        <div className="flex flex-row text-center">
          <div className="flex flex-col bg-gray-100 mt-4 mr-3 rounded-lg shadow-lg p-2">
            <BsPeople size="70" color="#002570" className="self-center"/>
            <h5 className="mt-4">For our Customers</h5>
            <ul className="list-disc text-gray-500">
              <li className="ml-6 mt-4">
                Shop consciously from verified vendors without adding to
                environmental waste
              </li>
              <li className="ml-6 mt-4">
                Access to items sold at a discounted price
              </li>
            </ul>
          </div>


          <div className="flex flex-col bg-gray-100 mt-4 mr-3 rounded-lg shadow-lg p-2">
            <BsShopWindow size="70" color="#002570" className="self-center"/>
            <h5 className="mt-4">For our SMEs</h5>
            <ul className="list-disc text-gray-500">
              <li className="ml-6 mt-4">
              Recoup monetary capital locked up in excess inventory and returned
          eCommerce goods
              </li>
              <li className="ml-6 mt-4">
              Reduce wasteful production
              </li>
            </ul>
          </div>

          <div className="flex flex-col bg-gray-100 mt-4 rounded-lg shadow-lg p-2">
            <FaGlobeAsia size="70" color="#002570" className="self-center"/>
            <h5 className="mt-4">For our Environment</h5>
            <ul className="list-disc text-gray-500">
              <li className="ml-6 mt-4">
              Slow down the world’s consumption of resources by re-circulating
          existing inventory
              </li>
              <li className="ml-6 mt-4 ">
              Decrease the amount of waste that is diverted to landfills
              </li>
            </ul>
          </div>


        </div>

        <h1 className="text-5xl pt-4 ml-4 lg:px-0 font-bold text-black text-center">Recoverly By the Numbers</h1>
        <div className="flex flex-row justify-center">
            <p className="ml-6 mt-4">[# of products] products</p>
            <p className="ml-6 mt-4">[# of brands] brands</p>
        </div>
        
      </ShopNav>
    </ProtectedRoute>
  );
};

export default About;
