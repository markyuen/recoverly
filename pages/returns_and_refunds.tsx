import React from "react";
import ShopNav from "../components/layouts/ShopNav";
import Header from "../components/Common/Header";

const ReturnAndRefunds = () => {
  return (
    <ShopNav>
      <h1 className="text-5xl pt-4 lg:px-0 font-bold text-black mb-6">
        Returns and Refunds
      </h1>
      <p className="mb-4">
        If you are looking to return or exchange your
        order for whatever reason, we’re here to help! We offer free returns
        within 7 days of receiving your order. You can return your product for a
        full refund to the original payment method if the return request is
        valid.
      </p>
      <p>
        Please, however, note the following exceptions to our returns policy:
      </p>
      <ul className="list-disc ml-4 p-2 mb-4">
        <li>
        Returned items must have original tags still on and be returned in original packaging
        </li>
        <li>
        Returned items must have no visible signs of wear or use
        </li>
      </ul>

      <h1 className="text-3xl pt-4 lg:px-0 font-bold text-black mb-4">
        One Simple Step to Begin Your Returns Journey
      </h1>
      <ul className="list-disc ml-4 p-2 mb-4">
          <li>Send an email to <a href="mailto:hello@recoverly.sg" className="underline text-dark-blue-recoverly">hello@recoverly.sg</a> with the following information:
            <ul className="list-decimal ml-4 p-2">
                <li>Email address and Order ID</li>
                <li>Products you wish to return</li>
                <li>Reason(s) for return</li>
                <li>Any photos you may wish to provide to validate the reason for exchange</li>
            </ul>
          </li>
          <li>
          We will get back within 3 working days on whether the return has been approved and provide you with the next steps
          </li>
      </ul>
    </ShopNav>
  );
};

export default ReturnAndRefunds;
