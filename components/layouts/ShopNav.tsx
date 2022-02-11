/* This example requires Tailwind CSS v2.0+ */

import { Disclosure, Menu, Transition } from "@headlessui/react";
import Head from "next/head";
import Footer from "../footer/FooterContainer";

import NavBar from "../nav/NavBar";

export default function ShopNav({ children }) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="min-h-full">
        <NavBar />
        <div className="max-w-4xl px-4 xl:max-w-6xl mx-auto mt-8">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
