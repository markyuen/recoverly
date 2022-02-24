import React from "react";
import Header from "../../components/Common/Header";
import ShopNav from "../../components/layouts/ShopNav";
import ProtectedRoute from "../../components/route/ProtectedRoute";
import UserOrders from "../../components/Orders/UserOrders";
import LinkContainer from "../../components/Common/LinkContainer";

const Orders = () => {
  return (
    <ProtectedRoute>
      <ShopNav>
        <Header name="Your Orders" />
        <p className="ml-6 mt-4">View the orders you have placed and their current statuses. Each product in an order has an individual acceptance status and merchants may choose to accept or reject products on a case-by-case basis. Once a merchant has accepted or rejected each product, for their portion of the order, their status will appear as `Accepted` (or `Rejected` if they declined their entire portion of the order). Once the merchant has shipped their products, their status will appear as `Shipped,` and you can expect to recieve your products. Once all items are recieved, please mark your order as complete, and payment will be released to the merchants. Please note that any products that are rejected by merchants will not be charged.</p>
        <UserOrders />
        <div className="flex justify-center">
          <LinkContainer href="/">
            <div className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer justify-center">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
              <p>Return to main page.</p>
            </div>
          </LinkContainer>
        </div>
      </ShopNav>
    </ProtectedRoute>
  );
};

export default Orders;
