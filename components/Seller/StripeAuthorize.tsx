import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import useGraphQLQuery from "../../hooks/useQuery";
import useSWR from "swr";
import { fetcherWithBody } from "../../lib/swr";
import { useRouter } from 'next/router';

const StripeAuthorize = () => {
  const { makeGraphQLRequest } = useGraphQLQuery();

  const { user } = useUser();
  const { sub } = user;

  const router = useRouter()
  const body = router.query;

  if (body) {
    const { data, error } = useSWR(
      [
        "/api/verifyStripe",
        body,
      ],
      fetcherWithBody
    );

    if (error) return <div>Something went wrong...</div>
    if (!data) return <div>Authorizing with Stripe...</div>

    console.log(data);
    if (data?.account?.id) {
      console.log(data.account.id);
      // makeGraphQLRequest("updateSellerStripeId", { user_id: sub, stripe_id: data.account.id }, undefined);
    }
  }

  // router.push("/");

  return (
    <div className="max-w-5xl mx-auto">
      <p>Authorizing with Stripe...</p>
    </div>
  );
};

export default StripeAuthorize;
