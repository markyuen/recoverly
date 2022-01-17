import '../styles/global.css'

import ShopNav from '../components/layouts/ShopNav'

function MyApp({ Component, pageProps }) {
  return <ShopNav>
  <Component {...pageProps} />
  </ShopNav>
}

export default MyApp
