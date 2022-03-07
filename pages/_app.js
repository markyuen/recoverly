import "../styles/global.css";
import "../styles/about.css";

import { UserProvider } from "@auth0/nextjs-auth0";

import { CartWrapper } from "../context/CartContext";
import { UserRoleWrapper } from "../context/UserRoleContext";
import { ChakraProvider } from "@chakra-ui/react";
import "../i18n";

import AccessControlRoute from "../components/route/AccessControlRoute";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ChakraProvider>
        <CartWrapper>
          <UserRoleWrapper>
            <AccessControlRoute pageProps={pageProps}>
              <Component {...pageProps} />
            </AccessControlRoute>
          </UserRoleWrapper>
        </CartWrapper>
      </ChakraProvider>
    </UserProvider>
  );
}

export default MyApp;
