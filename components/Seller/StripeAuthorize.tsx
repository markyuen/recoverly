import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import useSWR from "swr";
import { fetcherWithBody } from "../../lib/swr";
import { useRouter } from 'next/router';

const StripeAuthorize = () => {

  const { user } = useUser();
  const { sub } = user;

  const router = useRouter()
  const body = router.query;
  body.user_id = sub;

  const { data } = useSWR(
    [
      "/api/verifyStripe",
      body,
    ],
    fetcherWithBody
  );

  useEffect(() => {
    if (data) {
      router.push("/");
    }
  })

  return (
    <div className="max-w-5xl mx-auto">
      <p>Finalizing authorization with Stripe...</p>
    </div>
  );
};

export default StripeAuthorize;
