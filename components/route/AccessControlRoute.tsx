import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import React from "react";
import { useUserRole } from "../../context/UserRoleContext";
import SpinnerWithMessage from "../Common/SpinnerWithMessage";
import SkeletonPage from "../Skeleton/SkeletonPage";

const AccessControlRoute = ({ children, pageProps }) => {
  const { user, isLoading } = useUser();
  const { role, pendingQuery } = useUserRole();
  const router = useRouter();

  if (pageProps.protected && (isLoading || pendingQuery)) {
    return <SpinnerWithMessage label="Setting up page" />;
  }

  if (pageProps.protected && !user) {
    router.push("/api/auth/login");

    return <SpinnerWithMessage label="Setting up page" />;
  }

  if (
    pageProps.protected &&
    pageProps.userTypes &&
    pageProps.userTypes.indexOf(role) === -1
  ) {
    router.push("/");
    return <SpinnerWithMessage label="Setting up page" />;
  }

  return <div>{children}</div>;
};

export default AccessControlRoute;
