import React from "react";

type HeaderProps = {
  name: string;
};

const Header = ({ name }: HeaderProps) => {
  return (
    <h1 className="md:text-5xl text-3xl pt-4 ml-4 lg:px-0 font-bold text-black">
      {name}
    </h1>
  );
};

export default Header;
