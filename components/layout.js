//REACT
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
//UTILS
import { getCookie } from "../utils/cookie";
//PROP-TYPES
import PropTypes from "prop-types";
//INTL
import { IntlProvider } from "react-intl";
//LANGUAGES
import it from "../intl/it.json";
import en from "../intl/en.json";
//SHOPIFY-BUY
import Client from "shopify-buy";
//CONTEXT
import SharedStateContext from "../components/shared-state-context";
//COMPONENTS
import { Navbar } from "./Navbar";
import Footer from "./footer";

const Layout = ({ children }) => {
  const [shopifyClient, setShopifyClient] = useState(null);
  const [shopifyCheckout, setShopifyCheckout] = useState(null);
  const [language, _setLanguage] = useState("en");
  const router = useRouter();
  const messages = {
    it: it,
    en: en,
  };

  //FUNCTIONS
  const errorMissingTranslation = () => {
    //console.log("Error MISSING TRANSLATION]")
  };

  const setLanguage = useMemo(
    () => language => {
      _setLanguage(language);
    },
    [_setLanguage]
  );

  //USE-EFFECT
  useEffect(() => {
    const doAsync = async () => {
      // Initializing a client to return translated content
      const shopifyClient = await Client.buildClient({
        domain: process.env.SHOPIFY_STORE_DOMAIN,
        storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN,
        language: language,
      });
      setShopifyClient(shopifyClient);
      const checkoutId = getCookie("checkoutId");
      if (checkoutId) {
        shopifyClient.checkout.fetch(checkoutId).then(checkout => {
          setShopifyCheckout(checkout);
        });
      }
    };
    doAsync();
  }, [setShopifyClient, setShopifyCheckout, language]);

  return (
    <SharedStateContext.Provider
      value={{
        shopifyClient,
        shopifyCheckout,
        setShopifyCheckout,
        language,
        setLanguage,
      }}
    >
      <IntlProvider
        locale={language}
        messages={messages[language]}
        onError={errorMissingTranslation}
      >
        <Navbar />
        {children}
        {router.pathname !== "products" && <Footer />}
      </IntlProvider>
    </SharedStateContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
