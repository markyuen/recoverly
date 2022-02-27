import { useUser } from "@auth0/nextjs-auth0"
import React, { useEffect, useState } from "react"
import FormInput from "../Form/FormInput"
import { makeGraphQLQuery } from "../../lib/GraphQL"
import validateUEN from "../../lib/validateUEN"
import genStripeOnboardingLink from "../../lib/genStripeOnboardingLink"
import InternalLink from "../Common/Link"
import validateTwoDecimalNum from "../../lib/validateTwoDecimalNum"
import SpinnerWithMessage from "../Common/SpinnerWithMessage"
import { nanoid } from "nanoid"

export const SIGN_UP_TYPE = "SIGN_UP"
export const UPDATE_TYPE = "UPDATE"

function convertToInt(n: string) {
  return ~~(parseFloat(n) * 100)
}

const SellerDetails = ({ callerType }) => {
  const { user } = useUser()
  const [loadingData, setLoadingData] = useState(true)
  const [loading, setLoading] = useState(false)
  const [lastSellerData, setLastSellerData] = useState(null)
  const [sellerData, setSellerData] = useState(null)

  useEffect(() => {
    if (!user) return;

    if (callerType === SIGN_UP_TYPE) {
      setSellerData({
        user_id: user.sub,
        company_name: "",
        address: "",
        office_number: "",
        acra_uen: "",
        first_name: "",
        last_name: "",
        flat_shipping_fee: "",
        product_total_free_delivery: "",
      })
      setLoadingData(false)
      return
    }

    if (callerType === UPDATE_TYPE) {
      makeGraphQLQuery("getUserSellerInfo", { user_id: user.sub })
        .then((res) => {
          const data = res.user_by_pk
          if (data.seller) {
            data.seller.flat_shipping_fee = data.seller.flat_shipping_fee / 100
            data.seller.product_total_free_delivery = data.seller.product_total_free_delivery / 100
            setSellerData({ ...data.seller })
            setLastSellerData(JSON.stringify({ ...data.seller }))
          }
          setLoadingData(false)
        })
        .catch((err) => console.log(err))
    }
  }, [user])

  const updateSellerData = (k: string, v: any) => {
    const newSellerData = { ...sellerData }
    newSellerData[k] = v
    setSellerData(newSellerData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Input validation
      if (sellerData.company_name === "") {
        alert("Company Name cannot be empty.")
        return
      }
      if (sellerData.address === "") {
        alert("Address cannot be empty.")
        return
      }
      if (!validateUEN(sellerData.acra_uen)) {
        alert("Invalid UEN format.")
        return
      }
      if (sellerData.first_name === "") {
        alert("First Name cannot be empty.")
        return
      }
      if (sellerData.last_name === "") {
        alert("Last Name cannot be empty.")
        return
      }
      if (!validateTwoDecimalNum(sellerData.flat_shipping_fee)) {
        alert("Flat Shipping Fee must be a number with at most two decimal places.")
        return
      }
      if (!validateTwoDecimalNum(sellerData.product_total_free_delivery)) {
        alert("Free Delivery Threshold must be a number with at most two decimal places.")
        return
      }

      if (callerType === SIGN_UP_TYPE) {
        // Insert new seller
        const payload = { ...sellerData }
        payload.flat_shipping_fee = convertToInt(payload.flat_shipping_fee)
        payload.product_total_free_delivery = convertToInt(payload.product_total_free_delivery)
        payload.display_name = nanoid(12)
        await makeGraphQLQuery("insertNewSeller", payload)
          .then((res) => {
            console.log(res)
            window.location.href = genStripeOnboardingLink(user.email, sellerData.first_name, sellerData.last_name)
          })
          .catch((err) => console.log(err))

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
      }

      if (callerType === UPDATE_TYPE) {
        // Update info
        if (JSON.stringify(sellerData) === lastSellerData) {
          alert("Nothing to update!")
          return
        }
        const payload = { ...sellerData, user_id: user.sub }
        payload.flat_shipping_fee = convertToInt(payload.flat_shipping_fee)
        payload.product_total_free_delivery = convertToInt(payload.product_total_free_delivery)
        delete payload.stripe_id
        delete payload.verified
        delete payload.display_name
        await makeGraphQLQuery("updateSellerInfo", payload)
          .then((res) => {
            setLastSellerData(JSON.stringify(sellerData))
            alert("Success updating your information!")
          })
          .catch((err) => console.log(err))
      }
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return <SpinnerWithMessage label="Configuring Page" />
  }

  return (
    <div className="max-w-5xl mx-auto">
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="space-y-8  sm:space-y-5">
          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">

            {/* Probably can be removed since a seller can only be verified after they
            register with Stripe */}
            {
              callerType === UPDATE_TYPE &&
              sellerData &&
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
                <label
                  className="block text-sm font-medium text-gray-700"
                >
                  Merchant Status (You may upload products once you are verified.)
                </label>
                {
                  sellerData.stripe_id &&
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center">
                      <p><i>{sellerData.verified ? "Verified" : "Pending Verification"}</i></p>
                    </div>
                  </div>
                }
                {
                  !sellerData.stripe_id &&
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <button
                      type="button"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        window.location.href = genStripeOnboardingLink(user.email, sellerData.first_name, sellerData.last_name)
                      }}
                    >
                      Connect your account with Stripe
                    </button>
                  </div>
                }
              </div>
            }

            {
              callerType === UPDATE_TYPE &&
              sellerData &&
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
                <label
                  className="block text-sm font-medium text-gray-700"
                >
                  Display Name (Your real company name is anonymized and your products/orders will be listed with this value instead.)
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center">
                    <p><i>{sellerData.display_name}</i></p>
                  </div>
                </div>
              </div>
            }

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
              label="Office Number"
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
              label="Flat Shipping Fee (You must handle delivery. This delivery fee will be applied unless order amount exceeds the threshold indicated directly below.)"
            />
            <FormInput
              type="number"
              value={sellerData.product_total_free_delivery}
              onChange={(e) => updateSellerData("product_total_free_delivery", e.target.value)}
              label="Free Delivery Threshold (At what total order cost are you willing to offer free delivery?)"
            />

            {
              callerType === SIGN_UP_TYPE &&
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Register with Stripe
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save and Connect with Stripe
                </button>
              </div>
            }

            {
              callerType === UPDATE_TYPE &&
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
                    disabled={loading}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            }

          </div>
        </div>
      </form>
    </div>
  )
}

export default SellerDetails
