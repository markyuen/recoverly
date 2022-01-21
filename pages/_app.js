import "../styles/global.css";
import { UserProvider } from "@auth0/nextjs-auth0";

import { CartWrapper } from "../context/CartContext";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <CartWrapper>
        <UserProvider>
          <Component {...pageProps} />;
        </UserProvider>
      </CartWrapper>
    </ChakraProvider>
  );
}

export default MyApp;
