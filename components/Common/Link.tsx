import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useUserRole } from "../../context/UserRoleContext";

type InternalLinkProps = {
  name: string;
  href: string;
  styling: string;
  type: string;
};

const InternalLink = ({ name, href, styling, type }: InternalLinkProps) => {
  const router = useRouter();
  const { role } = useUserRole();

  if (type == "admin" && role != "admin") return null;
  if (type == "seller" && role != "seller") return null;

  return (
    <div className={styling}>
      <Link href={href}>{name}</Link>
    </div>
  );
};

export default InternalLink;
