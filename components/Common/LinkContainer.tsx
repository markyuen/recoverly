import { useRouter } from "next/router";
import React from "react";

type LinkContainerProps = {
  href: string;
  children: any;
};

const LinkContainer = ({ href, children }: LinkContainerProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return <div onClick={handleClick}>{children}</div>;
};

export default LinkContainer;
