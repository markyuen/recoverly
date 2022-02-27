import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from 'next/router';
import useSWR from "swr";
import { fetcherWithBody } from "../../lib/swr";
import SpinnerWithMessage from "../Common/SpinnerWithMessage";

const StripeAuthorize = () => {
  const router = useRouter();
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  const [payload, setPayload] = useState(null);

  const { data } = useSWR(
    {
      url: mounted ? "/api/verifyStripe" : null,
      body: payload,
    },
    fetcherWithBody,
  );

  useEffect(() => {
    if (!user) {
      return;
    }
    if (!data) {
      setPayload({ ...router.query, user_id: user.sub });
      setMounted(true);
      return;
    }
    console.log(data);
    router.push("/");
  }, [user, data]);

  return <SpinnerWithMessage label="Finalizing authorization with Stripe, please do not refresh page" />;
};

export default StripeAuthorize;
