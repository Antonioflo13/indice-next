//REACT
import React, { useEffect } from "react";
import { useRouter } from "next/router";
//STORE
import { useDispatch, useSelector } from "react-redux";
import { setClient } from "../store/modules/shopify";
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
  const dispatch = useDispatch();
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

  //USE-EFFECT
  useEffect(() => {
    dispatch(setClient(language));
  }, [language]);

  return (
    <IntlProvider
      locale={language}
      messages={messages[language]}
      onError={errorMissingTranslation}
    >
      <Navbar />
      {children}
      {router.pathname !== "/product" && isDesktop && <Footer />}
    </IntlProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
