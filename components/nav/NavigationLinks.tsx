import { useRouter } from "next/dist/client/router";
import React from "react";
import NavLink from "./NavLink";

type NavigationLink = {
  name: string;
  href: string;
};

type NavigationLinksProps = {
  navigationLinks: NavigationLink[];
};

const NavigationLinks = ({ navigationLinks }: NavigationLinksProps) => {
  const router = useRouter();

  return (
    <>
      {navigationLinks.map((item, index) => (
        <NavLink
          href={item.href}
          key={index}
          current={item.href === router.pathname}
          name={item.name}
        />
      ))}
    </>
  );
};

export default NavigationLinks;
