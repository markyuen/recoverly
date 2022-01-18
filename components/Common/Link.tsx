import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type InternalLinkProps = {
  name: string;
  href: string;
  styling: string;
};

const InternalLink = ({ name, href, styling }: InternalLinkProps) => {
  const router = useRouter();
  return (
    <div className={styling}>
      <Link href={href}>{name}</Link>
    </div>
  );
};

export default InternalLink;
