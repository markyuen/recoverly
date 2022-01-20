import Link from "next/link";
import InternalLink from "../Common/Link";
import SearchBar from "./SearchBar";
import { useUser } from "@auth0/nextjs-auth0";
import Layout from "../layouts/layout";
import LinkContainer from "../Common/LinkContainer";

const NavBar = () => {
  const { user, error, isLoading } = useUser();
  console.log(user);

  return (
    <>
      <div className="bg-gray-100 py-10 ">
        <div className="mx-auto max-w-4xl xl:max-w-6xl px-4">
          <div className="flex justify-between  text-gray-600 text-xs">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <span className="px-2 flex items-center"> +65 1234-1234</span>
            </div>
            <div className="flex items-center justify-center">
              {!user ? (
                <InternalLink
                  href="/api/auth/login"
                  name="Login/Signup"
                  styling="px-2"
                />
              ) : (
                <>
                  <InternalLink
                    href="/account"
                    name="Your Account"
                    styling="px-2"
                  />
                  <InternalLink
                    href="/api/auth/logout"
                    name="Sign Out"
                    styling="px-2"
                  />
                </>
              )}
              <LinkContainer href="/cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </LinkContainer>
            </div>
          </div>
          <div className="flex items-center py-4">
            <div className="pr-4 text-2xl text-black">
              <Link href={"/"}>Recoverly</Link>
            </div>

            <SearchBar />
          </div>
          <div className="text-md text-gray-600">
            <span className="pr-5">Categories</span>
            <span className="">Brands</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
