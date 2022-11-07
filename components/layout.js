//REACT
import React, { useEffect } from "react";
import { useRouter } from "next/router";
//STORE
import { useDispatch, useSelector } from "react-redux";
//HOOKS
import useMediaQuery from "../hooks/useMediaQuery";
//PROP-TYPES
import PropTypes from "prop-types";
//INTL
import { IntlProvider } from "react-intl";
//LANGUAGES
import it from "../intl/it.json";
import en from "../intl/en.json";
//COMPONENTS
import { Navbar } from "./Navbar";
import Footer from "./footer";

const Layout = ({ children }) => {
  //STORE
  const language = useSelector(state => state.language.value);
  //ROUTER
  const router = useRouter();
  //STATE
  const isDesktop = useMediaQuery(768);
  const messages = {
    it: it,
    en: en,
  };

  //FUNCTIONS
  const errorMissingTranslation = () => {
    //console.log("Error MISSING TRANSLATION]")
  };

  // //USE-EFFECT
  // useEffect(() => {
  //   client().then(r => r);
  // }, [language]);
  //
  // const client = async () => {
  //   const buildClient = await Client.buildClient({
  //     domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  //     storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESSTOKEN,
  //     language: language,
  //   });
  //   const checkout =  await buildClient.checkout.create();
  //   const checkoutId = checkout.id;
  //   setCookie("checkoutId", checkoutId, 90);
  //   dispatch(setShopifyCheckout(JSON.stringify(checkout)));
  // }

  return (
    <IntlProvider
      locale={language}
      messages={messages[language]}
      onError={errorMissingTranslation}
    >
      <Navbar />
      {children}
      {router.pathname !== "/collections/[...product]" && !isDesktop && (
        <Footer />
      )}
    </IntlProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
