import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import React from "react";
import { useUserRole } from "../../context/UserRoleContext";
import SkeletonPage from "../Skeleton/SkeletonPage";

const AccessControlRoute = ({ children, pageProps }) => {
  const { user, isLoading } = useUser();
  const { role } = useUserRole();
  const router = useRouter();

  if (pageProps.protected && isLoading) {
    return <SkeletonPage />;
  }

  if (pageProps.protected && !user) {
    router.push("/api/auth/login");

    return <SkeletonPage />;
  }

  if (
    pageProps.protected &&
    pageProps.userTypes &&
    pageProps.userTypes.indexOf(role) === -1
  ) {
    router.push("/");
    return <SkeletonPage />;
  }

  return <div>{children}</div>;
};

export default AccessControlRoute;
