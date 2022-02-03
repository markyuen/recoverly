import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import FormInput from "../Form/FormInput";
import { makeGraphQLQuery } from "../../lib/GraphQL";

const SellerSignUpForm = () => {
  const { user } = useUser();
  const { sub, email } = user;

  const [userData, setUserData] = useState({
    user_id: sub,
    company_name: "",
    address: "",
    office_number: "",
    acra_uen: "",
    first_name: "",
    last_name: "",
  });

  const updateKeyValue = (key, value) => {
    const newUserData = { ...userData };
    newUserData[key] = value;
    setUserData(newUserData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("----Submitting Information Of ----- ");
    console.log(userData);
    makeGraphQLQuery("insertNewSeller", userData)
      .then((res) => {
        // TODO: add toasts
        console.log("Success.");
        console.log(res);
        const url = `https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID
          }&redirect_uri=https://${process.env.NEXT_PUBLIC_SITE_URL
          }/stripe_authorization&stripe_user[email]=${email
          }&stripe_user[first_name]=${userData.first_name
          }&stripe_user[last_name]=${userData.last_name
          }`;
        window.location.href = url;
      })
      .catch((err) => console.log(err));

    // TODO: switch to Stripe server link generation instead of
    // manually creating link, however, will then need to properly
    // manage user flows and what happens if user does not finish
    // the onboarding properly, since going this route will generate
    // the account link immediately

    // const link = await fetch("/api/stripe-onboard-link", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(userData),
    // })
  };

  return (
    <div className="max-w-5xl mx-auto">
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="space-y-8  sm:space-y-5">
          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <FormInput
              type="text"
              value={userData.company_name}
              onChange={(e) => updateKeyValue("company_name", e.target.value)}
              label="Company Name"
            />
            <FormInput
              type="text"
              value={userData.address}
              onChange={(e) => updateKeyValue("address", e.target.value)}
              label="Address"
            />
            <FormInput
              type="text"
              value={userData.office_number}
              onChange={(e) => updateKeyValue("office_number", e.target.value)}
              label="Office Number"
            />
            <FormInput
              type="text"
              value={userData.acra_uen}
              onChange={(e) => updateKeyValue("acra_uen", e.target.value)}
              label="ACRA UEN"
            />
            <FormInput
              type="text"
              value={userData.first_name}
              onChange={(e) => updateKeyValue("first_name", e.target.value)}
              label="First Name"
            />
            <FormInput
              type="text"
              value={userData.last_name}
              onChange={(e) => updateKeyValue("last_name", e.target.value)}
              label="Last Name"
            />
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Register with Stripe
              </label>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save and Connect with Stripe
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SellerSignUpForm;
