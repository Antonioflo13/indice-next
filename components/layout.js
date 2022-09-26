import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { IntlProvider } from "react-intl"
import it from "../intl/it.json"
import en from "../intl/en.json"

import SharedStateContext from "../components/shared-state-context"
import { AnimatePresence, motion } from "framer-motion"
import Sidebar from "../components/sidebar"
import Contact from "../components/contact"
import Client from "shopify-buy"
import Link from "../components/LanguagesLink"
//IMAGES
import logoIta from "../assets/images/logoIta.png"
import logoEng from "../assets/images/logoEng.png"
import menuBurgher from "../assets/images/menu-burger.svg"
import cartIcon from "../assets/images/shopping-bag.svg"

import Drawer from "../components/drawer"
import { useMediaQuery } from "react-responsive"
import { getCookie } from "../utils/cookie"
import Image from "next/image";

const isBrowser = typeof window !== "undefined"

const Layout = ({ children, location, pageContext }) => {
  const [currentSidebarTitle, setCurrentSidebarTitle] = useState("")

  const [sidebarShown, _setSidebarShown] = useState(false)
  const setSidebarShown = useMemo(
      () => sidebarShown => {
        // Prevents scrolling of contents behind the sidebar
        document.body.style.overflow = sidebarShown ? "hidden" : "visible"
        _setSidebarShown(sidebarShown)
      },
      [_setSidebarShown]
  )

  const [contactShown, _setContactShown] = useState(false)
  const [contactProduct, setContactProduct] = useState(null)
  const [cart, setCart] = useState(null)

  const setContactShown = useMemo(
      () => (contactShown, contactProduct = null) => {
        // Prevents scrolling of contents behind the sidebar
        document.body.style.overflow = contactShown ? "hidden" : "visible"
        _setContactShown(contactShown)
        setContactProduct(contactProduct)
      },
      [_setContactShown, setContactProduct]
  )

  const [shopifyClient, setShopifyClient] = useState(null)
  const [shopifyCheckout, setShopifyCheckout] = useState(null)

  useEffect(() => {
    const doAsync = async () => {
      // Initializing a client to return translated content
      const shopifyClient = Client.buildClient({
        domain: `${process.env.GATSBY_SHOPIFY_SHOP_NAME}.myshopify.com`,
        storefrontAccessToken:
        process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        language: pageContext.lang,
      })
      setShopifyClient(shopifyClient)
      const checkoutId = getCookie("checkoutId")
      shopifyClient.checkout.fetch(checkoutId).then(checkout => {
        setShopifyCheckout(checkout)
      })
    }
    doAsync()
  }, [setShopifyClient, setShopifyCheckout, 'it'])

  const messages = {
    it: it,
    en: en,
  }
  let language

  if (isBrowser) {
    if (window.location.pathname.indexOf("/it") === 0) {
      language = "it"
    }

    if (window.location.pathname.indexOf("/en") === 0) {
      language = "en"
    }
  }

  const errorMissingTranslation = () => {
    //console.log("Error MISSING TRANSLATION]")
  }

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" })

  const totalQuantity = shopifyCheckout?.lineItems
      .map(item => item.quantity)
      .reduce((prev, curr) => prev + curr, 0)
  return (
      <SharedStateContext.Provider
          value={{
            lang: 'it',
            sidebarShown,
            setSidebarShown,
            contactShown,
            contactProduct,
            setContactShown,
            shopifyClient,
            shopifyCheckout,
            setShopifyCheckout,
            setCurrentSidebarTitle,
            cart,
            setCart,
          }}
      >
        <IntlProvider
            locale={'it'}
            messages={messages['it']}
            onError={errorMissingTranslation}
        >
          <>
            {/* Navbar */}
            <div className="px-5 md:px-5 left-0 top-0 w-full h-20 bg-white flex items-center justify-between z-30 customWidthHeader">
              <button
                  className="text-black font-semibold text-xs md:text-sm"
                  onClick={() => setSidebarShown(!sidebarShown)}
              >
                {isDesktop ? (
                    <div style={{ fontSize: "10px" }}>MENU</div>
                ) : (
                    <img src={menuBurgher.src} width={15} alt="burger-icon" />
                )}
              </button>
              <Link to={`/`}>
                <div className="flex flex-col justify-center items-center">
                  {language === "it" ? (
                      <img src={logoIta.src} alt="indice-logo" />
                  ) : (
                      <img className="logo" src={logoEng.src} alt="indice-logo" />
                  )}
                  {/* <div className="font-semibold subtitle-logo md:text-sm">
                  <FormattedMessage id="navbar.eyeglasses" />{" "}
                  <span className="text-indice-red italic">
                    <FormattedMessage id="navbar.extraordinary" />
                  </span>
                </div> */}
                </div>
              </Link>
              <button
                  className="text-black font-semibold text-xs md:text-sm"
                  style={{ fontSize: "10px" }}
                  onClick={() => setCart(shopifyCheckout)}
              >
                {isDesktop ? (
                    <div>CART ({totalQuantity ? totalQuantity : 0})</div>
                ) : (
                    <>
                      <img src={cartIcon.src} width={15} alt="cart-icon" />
                      <div>({totalQuantity})</div>
                    </>
                )}
              </button>
              {cart && (
                  <Drawer
                      handleClose={() => {
                        setCart(null)
                      }}
                      setCart={r => setCart(r)}
                  />
              )}
            </div>
            {children}
            <AnimatePresence>
              {sidebarShown && (
                  <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "tween" }}
                      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                      className="fixed top-0 right-0 h-full w-full z-10"
                      onClick={() => {
                        setSidebarShown(false)
                      }}
                  ></motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {cart && (
                  <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "tween" }}
                      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                      className="fixed top-0 right-0 h-full w-full z-10"
                      onClick={() => {
                        setCart(false)
                      }}
                  ></motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>{sidebarShown && <Sidebar />}</AnimatePresence>
            <AnimatePresence>
              {cart && (
                  <Drawer
                      handleClose={() => {
                        setCart(null)
                      }}
                      setCart={r => setCart(r)}
                  />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {contactShown && <Contact setShown={setContactShown} />}
            </AnimatePresence>
            <style jsx="true">{`
            .logo {
              width: 10em;
            }

            .customWidthHeader {
              max-width: 90rem;
              margin-left: auto;
              margin-right: auto;
              padding-left: 1.25rem;
              padding-right: 1.25rem;
              height: 70px;
            }

            @media (max-width: 768px) {
              .subtitle-logo {
                font-size: 10px;
              }
              .customWidthHeader {
                position: fixed;
              }
            }
          `}</style>
          </>
        </IntlProvider>
      </SharedStateContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
