import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import FormInput from "../Form/FormInput";
import { updateImage } from "../../lib/s3";
import InternalLink from "../Common/Link";
import { makeGraphQLQuery } from "../../lib/GraphQL";
import SpinnerWithMessage from "../Common/SpinnerWithMessage";
import validateUEN from "../../lib/validateUEN";
import validateTwoDecimalNum from "../../lib/validateTwoDecimalNum";

const UserProfile = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [originalSellerData, setOriginalSellerData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    makeGraphQLQuery("getUserSellerInfo", { user_id: user.sub })
      .then((res) => {
        const data = res.user_by_pk;
        data.seller.flat_shipping_fee = data.seller.flat_shipping_fee / 100;
        data.seller.product_total_free_delivery = data.seller.product_total_free_delivery / 100;
        setUserData({
          ...data,
          nickname: user.nickname,
          picture: user.picture,
        })
        if (res.user_by_pk.seller) {
          setSellerData({ ...data.seller });
          setOriginalSellerData(JSON.stringify({ ...data.seller }));
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [user]);

  const updateSellerData = (key: string, value: any) => {
    const newSellerData = { ...sellerData };
    newSellerData[key] = value;
    setSellerData(newSellerData);
  };

  const updateLocalImage = (e) => {
    const filename = URL.createObjectURL(e.target.files[0]);
    setUserData({ ...userData, picture: filename });
    setProfileImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    const extension = profileImage.name.split(".").pop();
    const fileName = `profile-image-${userData.nickname}.${extension}`;
    //TODO: Add some chained toasts for this
    updateImage(profileImage, fileName, fileName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profileImage) {
      uploadImage();
    }
    console.log("----Submitting Information Of ----- ");
    if (!sellerData || (JSON.stringify(sellerData) === originalSellerData)) {
      alert("Nothing to update!");
      return;
    }
    // Input validation
    if (sellerData.company_name === "") {
      alert("Company Name cannot be empty.");
      return;
    }
    if (sellerData.address === "") {
      alert("Address cannot be empty.");
      return;
    }
    if (!validateUEN(sellerData.acra_uen)) {
      alert("Invalid UEN format.")
      return;
    }
    if (sellerData.first_name === "") {
      alert("First Name cannot be empty.");
      return;
    }
    if (sellerData.last_name === "") {
      alert("Last Name cannot be empty.");
      return;
    }
    if (!validateTwoDecimalNum(sellerData.flat_shipping_fee)) {
      alert("Flat Shipping Fee must be a number with at most two decimal places.");
      return;
    }
    if (!validateTwoDecimalNum(sellerData.product_total_free_delivery)) {
      alert("Free Delivery Threshold must be a number with at most two decimal places.");
      return;
    }
    // Update info
    let payload = { ...sellerData, user_id: userData.user_id };
    payload.flat_shipping_fee = payload.flat_shipping_fee * 100;
    payload.product_total_free_delivery = payload.product_total_free_delivery * 100;
    delete payload.verified
    makeGraphQLQuery("updateSellerInfo", payload)
      .then((res) => {
        setOriginalSellerData(JSON.stringify(sellerData));
        alert("Success updating your information!");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <SpinnerWithMessage label="Configuring Page" />;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="space-y-8  sm:space-y-5">
          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <FormInput
              type="email"
              value={userData.email}
              onChange={null}
              label="Email"
              disabled
            />
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Photo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={userData.picture}
                      height={100}
                      width={100}
                      alt="profile"
                    />
                  </span>
                  <input
                    className="ml-5 bg-white py-2 px-3  text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onChange={updateLocalImage}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </div>
              </div>
            </div>

            {!sellerData &&
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sign Up as a Seller
                </label>
                <InternalLink
                  href="/seller_sign_up"
                  name="Sign Up Form"
                  styling="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="customer"
                />
              </div>}

            {sellerData &&
              <div>
                <h1><b>Company Details</b></h1>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Merchant Status (You may upload products once you are verified.)
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center">
                      <p><i>{sellerData.verified ? "Verified" : "Pending Verification"}</i></p>
                    </div>
                  </div>
                </div>

                <FormInput
                  type="text"
                  value={sellerData.company_name}
                  onChange={(e) => updateSellerData("company_name", e.target.value)}
                  label="Company Name"
                />
                <FormInput
                  type="text"
                  value={sellerData.address}
                  onChange={(e) => updateSellerData("address", e.target.value)}
                  label="Address"
                />
                <FormInput
                  type="text"
                  value={sellerData.office_number}
                  onChange={(e) => updateSellerData("office_number", e.target.value)}
                  label="Office Number (optional)"
                />
                <FormInput
                  type="text"
                  value={sellerData.acra_uen}
                  onChange={(e) => updateSellerData("acra_uen", e.target.value)}
                  label="ACRA UEN"
                />
                <FormInput
                  type="text"
                  value={sellerData.first_name}
                  onChange={(e) => updateSellerData("first_name", e.target.value)}
                  label="First Name"
                />
                <FormInput
                  type="text"
                  value={sellerData.last_name}
                  onChange={(e) => updateSellerData("last_name", e.target.value)}
                  label="Last Name"
                />
                <FormInput
                  type="number"
                  value={sellerData.flat_shipping_fee}
                  onChange={(e) => updateSellerData("flat_shipping_fee", e.target.value)}
                  label="Flat Shipping Fee (You must handle delivery. This delivery fee will be applied regardless of the order amount. Platform fee computation does not include this amount.)"
                />
                <FormInput
                  type="number"
                  value={sellerData.product_total_free_delivery}
                  onChange={(e) => updateSellerData("product_total_free_delivery", e.target.value)}
                  label="Free Delivery Threshold (At what total order cost are you willing to offer free delivery?)"
                />
              </div>
            }

          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <InternalLink
              href="/"
              name="Cancel"
              styling="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="customer"
            />
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
