import React from "react";
import Link from "next/link";

type NavLinkProps = {
  name: string;
  current: boolean;
  href: string;
};

const NavLink = ({ name, current, href }: NavLinkProps) => {
  const styling = current
    ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
    : "text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";

  return (
    <Link key={name} href={href} passHref>
      <span className={styling}>{name}</span>
    </Link>
  );
};

export default NavLink;
