import { useRouter } from "next/router";
import React from "react";

type href_link = string | { pathname: string; query: Record<string, any> };

type LinkContainerProps = {
  href: href_link;
  children: any;
};

const LinkContainer = ({ href, children, ...props }: LinkContainerProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <div onClick={handleClick} {...props}>
      {children}
    </div>
  );
};

export default LinkContainer;
