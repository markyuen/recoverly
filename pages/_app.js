import "../styles/global.css";
import { UserProvider } from "@auth0/nextjs-auth0";

import { CartWrapper } from "../context/CartContext";

function MyApp({ Component, pageProps }) {
  return (
    <CartWrapper>
      <UserProvider>
        <Component {...pageProps} />;
      </UserProvider>
    </CartWrapper>
  );
}

export default MyApp;
