import Link from "next/link";
import InternalLink from "../Common/Link";
import { useUser } from "@auth0/nextjs-auth0";
import ShoppingCartIcon from "./ShoppingCartIcon";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useTranslationHook from "../../hooks/useTranslationHook";

const NavBar = () => {
  const { user } = useUser();
  const router = useRouter();
  const { translate, switchLanguage, currLanguage } = useTranslationHook();
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
                    name={translate("Seller Dashboard")}
                    styling="px-2"
                    type="verified-seller"
                  />
                  <InternalLink
                    href="/account"
                    name={translate("Your Account")}
                    styling="px-2"
                    type="customer"
                  />
                  <InternalLink
                    href="/api/auth/logout"
                    name={translate("Sign Out")}
                    styling="px-2"
                    type="customer"
                  />
                </>
              )}
              <p
                className="px-2  border bg-white cursor-pointer py-2"
                onClick={() => switchLanguage()}
              >
                Switch to {currLanguage == "en" ? "Thai" : "English"}
              </p>
              <div className="cursor-pointer">
                <ShoppingCartIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
