import "../styles/globals.css";
import type { AppProps } from "next/app";
import { IntlProvider } from "react-intl";
import it from "../intl/it.json";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IntlProvider locale={"it"}>
      <Component {...pageProps} />˙
    </IntlProvider>
  );
}

export default MyApp;
