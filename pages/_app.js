import "../styles/global.css";
import { UserProvider } from "@auth0/nextjs-auth0";

import { CartWrapper } from "../context/CartContext";
import { UserRoleWrapper } from "../context/UserRoleContext";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ChakraProvider>
        <CartWrapper>
          <UserRoleWrapper>
            <Component {...pageProps} />
          </UserRoleWrapper>
        </CartWrapper>
      </ChakraProvider>
    </UserProvider>
  );
}

export default MyApp;
