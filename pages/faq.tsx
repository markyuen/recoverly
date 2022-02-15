import React, { useState } from "react";
import Header from "../components/Common/Header";
import ShopNav from "../components/layouts/ShopNav";
import { IoIosArrowDown } from "react-icons/io";

const FAQComponent = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="flex flex-col p-3 mt-2 border-b text-gray-light cursor-pointer"
    >
      <div className="flex flex-row items-center">
        <p
          className={`flex-auto hover:text-yellow-500 "text-gray-dark font-bold "font-normal"`}
        >
          {props.question.header}
        </p>
        <IoIosArrowDown />
      </div>
      <div
        className={`transition-max-height duration-700 ease-in-out overflow-hidden mt-2 ${
          expanded ? "max-h-auto" : "max-h-0"
        }`}
      >
        <p>{props.question.body}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const buyerFAQ = [
    {
      header: "How are shipping fees calculated?",
      body: "To provide our sellers with utmost flexibility, shipping fees and the amount purchased to qualify for free delivery are solely determined by the seller",
    },
    {
      header: "What kind of products are listed on Recoverly?",
      body: "Most of the products listed belong to two categories: (1) excess inventory; and (2) returned goods. To find out more about the nature of our products and why Recoverly even exists, simply navigate to our “About” page to find out more!",
    },
    {
      header: "How do I return / exchange my purchase?",
      body: "It is okay to have changed your mind! If you would like to return your product, please kindly refer to our Returns and Refund guide (which you can find below) and we would be happy to assist you accordingly",
    },
    {
      header:
        "Why does Recoverly not provide the contact details of merchants on the product pages?",
      body: `This is an option which Recoverly provides to ensure that merchants can anonymously sell their excess inventory and returned goods at a discounted price without running the risk of damaging their existing supplier relationships or brand.
        
        However, not to worry! Before any merchant is onboarded and allowed to list their products, Recoverly checks and ensures that they are legitimate businesses.

        In the end, we hope everyone gets to benefit from this: customers get to discover discounted products with peace of mind while our merchants can monetize their excess goods while preserving their anonymity
        `,
    },
    {
      header: "How can I contact Recoverly Customer Service?",
      body: "We can be easily reached at hello@recoverly.sg and aim to provide you with a response within 2 working days of receiving your email",
    },
  ];

  const sellerFAQ = [
    {
      header: "How can I sign up and list my products on Recoverly? ",
      body: "Easy! Simply sign up for an account and navigate to “Your Account” in the navigation bar above. From there, fill in a few short details to sign up to be a merchant. Once your sign up is approved, you can begin listing your products to start monetizing your excess inventory and returned products!",
    },
    {
      header: "Can I list my products anonymously?",
      body: "Of course! This is an option that Recoverly provides to ensure that merchants can anonymously sell their excess inventory and returned goods at a discounted price without running the risk of damaging their existing supplier relationships or brand",
    },
    {
      header: "How much does Recoverly charge the sellers?",
      body: "Onboarding and listing of products on Recoverly is FREE. To ensure that our interests are aligned, Recoverly only earns a small commission when a merchant has successfully sold items on our platform. To find out more about our fees and charges, feel free to drop us an email at hello@recoverly.sg",
    },
    {
      header: "Where can I set my shipping fees?",
      body: "Simply navigate to “Your Account” and you would be able to set the amount you would like to charge for each delivery and if you would like to offer free delivery above a certain purchase quantum",
    },
  ];

  const FAQBuyerItems = buyerFAQ.map((faq) => {
    return <FAQComponent question={faq} />;
  });

  const FAQSellerItems = sellerFAQ.map((faq) => {
    return <FAQComponent question={faq} />;
  });

  return (
    <ShopNav>
      <h1 className="text-5xl pt-4 lg:px-0 font-bold text-black">
        Frequently Asked Questions
      </h1>

      <div className="mt-10">
        <h1 className="text-3xl pt-4 lg:px-0 font-bold text-black">Buyers</h1>
        {FAQBuyerItems}
      </div>

      <div className="mt-10">
        <h1 className="text-3xl pt-4 lg:px-0 font-bold text-black">Sellers</h1>
        {FAQSellerItems}
      </div>
    </ShopNav>
  );
};

export default FAQ;
