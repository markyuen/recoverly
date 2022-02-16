import Link from "next/link";
import InternalLink from "../Common/Link";
import SearchBar from "./SearchBar";
import { useUser } from "@auth0/nextjs-auth0";
import ShoppingCartIcon from "./ShoppingCartIcon";
import Image from "next/image";

const NavBar = () => {
  const { user } = useUser();

  return (
    <>
      <div className="">
        <div className="mx-auto max-w-4xl xl:max-w-6xl px-4">
          <div className="flex justify-between  text-gray-600 text-xs">
            <div className="flex items-center">
              <div className=" text-black">
                <Link href={"/"} passHref>
                  <div className="flex items-center cursor-pointer">
                    <Image
                      src="/logo.png"
                      width={100}
                      height={100}
                      alt="logo"
                    />
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              {!user ? (
                <InternalLink
                  href="/api/auth/login"
                  name="Login/Signup"
                  styling="px-2"
                  type="customer"
                />
              ) : (
                <>
                  <InternalLink
                    href="/admin"
                    name="Admin Panel"
                    styling="px-2"
                    type="admin"
                  />
                  <InternalLink
                    href="/seller"
                    name="Seller Dashboard"
                    styling="px-2"
                    type="verified-seller"
                  />
                  <InternalLink
                    href="/account"
                    name="Your Account"
                    styling="px-2"
                    type="customer"
                  />
                  <InternalLink
                    href="/api/auth/logout"
                    name="Sign Out"
                    styling="px-2"
                    type="customer"
                  />
                </>
              )}
              <div className="cursor-pointer">
                <ShoppingCartIcon />
              </div>
            </div>
          </div>

          {/* <div className="text-md text-gray-600">
            <span className="pr-5">Categories</span>
            <span className="">Brands</span>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default NavBar;
