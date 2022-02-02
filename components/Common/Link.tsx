import Link from "next/link";
import React from "react";
import { useUserRole } from "../../context/UserRoleContext";

type InternalLinkProps = {
  name: string;
  href: string;
  styling: string;
  type: string;
};

const InternalLink = ({ name, href, styling, type }: InternalLinkProps) => {
  const { role } = useUserRole();

  if (type == "admin" && role != "admin") return null;
  if (
    type == "verified-seller" &&
    role != "verified-seller" &&
    role != "admin") {
      return null;
  }
  if (
    type == "unverified-seller" &&
    role != "unverified-seller" &&
    role != "verified-seller" &&
    role != "admin") {
    return null;
  }

  return (
    <div className={styling}>
      <Link href={href}>{name}</Link>
    </div>
  );
};

export default InternalLink;
