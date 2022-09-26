import { motion } from "framer-motion"
import React, { useContext, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import ModalsIcons from "./modalsIcons"
import Incons from "../data/icons"
import Link from "next/link";
import LinkMenu from "./linkMenu"
import SharedStateContext from "./shared-state-context"
import closeIcon from "../assets/images/cross.svg"
import logo from "../assets/images/logo-black.png"
import shoppingBag from "../assets/images/shopping-bag-red.svg"

const sidebarVariants = {
  hidden: { x: "-100%", transition: { type: "tween" } },
  shown: {
    x: "0",
    transition: { type: "tween", staggerChildren: 0.1, when: "beforeChildren" },
  },
}

const Sidebar = () => {
  const intl = useIntl()
  //const { setSidebarShown } = useContext(SharedStateContext)
  const [show, setShown] = useState(false)
  const [selectSingleIcon, setSelectSingleIcon] = useState()

  // BUTTONS IT/EN
  const it = window.location.href.indexOf("/it") !== -1
  const en = window.location.href.indexOf("/en") !== -1

  const {
    setSidebarShown,
    setShopifyCheckout,
    shopifyClient,
    setCart,
    shopifyCheckout,
  } = useContext(SharedStateContext)

  const changeSiderbar = () => {
    setCart(shopifyCheckout)
    setSidebarShown(false)
  }

  return (
    <>
      <motion.div
        variants={sidebarVariants}
        initial={"hidden"}
        animate={"shown"}
        exit={"hidden"}
        className="fixed top-0 left-0 h-full w-full md:w-1/2 bg-indice-grey z-50"
        style={{ maxWidth: 500 }}
      >
        <div className="flexMenu mt-8 mx-10">
          <img className="logoMenu" src={logo} alt="" />
          <button className="close-menu" onClick={() => setSidebarShown(false)}>
            <img src={closeIcon} width={10} alt="cart-icon" />
          </button>
        </div>
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex flex-col w-10/12 h-full">
            <div className="flex-1 flex flex-col justify-center items-start">
              <LinkMenu to="/" sidebar>
                <FormattedMessage id="sidebar.home" />
              </LinkMenu>
              <LinkMenu to="/collections" sidebar>
                <FormattedMessage id="sidebar.designers" />
              </LinkMenu>
              <LinkMenu to="/botiques" sidebar>
                <FormattedMessage id="sidebar.botiques" />
              </LinkMenu>
              <LinkMenu to="/magazine" sidebar>
                <FormattedMessage id="sidebar.magazine" />
              </LinkMenu>
              <LinkMenu to="/about" sidebar>
                <FormattedMessage id="sidebar.about" />
              </LinkMenu>
              <LinkMenu to="/faq" sidebar>
                <FormattedMessage id="sidebar.faq" />
              </LinkMenu>
            </div>

            {/* BUTTONS IT/EN */}

            <div className="container-buttons-multilingual">
              <Link to="/it">
                <div
                  className="button-it font-bold"
                  style={{ color: `${it ? "#800000" : ""}` }}
                >
                  IT
                </div>
              </Link>
              <span className="separator font-bold">|</span>
              <Link to="/en">
                <div
                  className="button-en font-bold"
                  style={{ color: `${en ? "#800000" : ""}` }}
                >
                  EN
                </div>
              </Link>
            </div>

            <div>
              <div className="flex justify-between">
                {Incons(intl).map((icon, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setShown(true)
                      setSelectSingleIcon(icon)
                    }}
                  >
                    <img
                      src={icon.iconSrc}
                      alt={icon.alt}
                      style={{
                        width: "30px",
                        cursor: "pointer",
                        marginBottom: "80px",
                      }}
                    />
                  </div>
                ))}
                <img
                  src={shoppingBag}
                  alt=""
                  style={{
                    width: "30px",
                    cursor: "pointer",
                    marginBottom: "80px",
                  }}
                  onClick={() => changeSiderbar()}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {show && (
        <ModalsIcons selectSingleIcon={selectSingleIcon} setShown={setShown} />
      )}
      <style jsx="true">
        {`
          .flexMenu {
            display: flex;
            justify-content: space-between;
          }
          .logoMenu {
            width: 8vh;
            cursor: pointer;
          }
          .close-menu {
            font-size: 12px;
          }
          .container-buttons-multilingual {
            display: flex;
            margin-bottom: 30px;
            width: 100px;
          }

          .button-it,
          .button-en {
            cursor: pointer;
          }

          .button-en {
          }

          .separator {
            margin-right: 20px;
            margin-left: 20px;
          }
        `}
      </style>
    </>
  )
}

export default Sidebar
