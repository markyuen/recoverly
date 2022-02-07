import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import SpinnerWithMessage from "../Common/SpinnerWithMessage";

const Success = () => {
  const router = useRouter();
  const [redirectSeconds, setRedirectSeconds] = useState(3);

  useEffect(() => {
    if (redirectSeconds === 0) {
      router.push("/");
      return;
    }
    setTimeout(() => {
      setRedirectSeconds(redirectSeconds - 1);
    }, 1000)
  }, [redirectSeconds]);

  return <SpinnerWithMessage label="Success checking out! Redirecting to the home page in 3 seconds" />;
};

export default Success;
