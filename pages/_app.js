import "../styles/global.css";
import { UserProvider } from '@auth0/nextjs-auth0';

import ShopNav from "../components/layouts/ShopNav";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />;
    </UserProvider>
  );
}

export default MyApp;
