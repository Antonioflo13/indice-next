//REACT
import React from "react";
//STORE
import { useDispatch, useSelector } from "react-redux";
import { setDialogContactShow } from "../store/modules/dialogContact";
import { setSideBarShow } from "../store/modules/sideBar";
import { setCart } from "../store/modules/cart";
//HOOKS
import useMediaQuery from "../hooks/useMediaQuery";
//FRAMER-MOTION
import { AnimatePresence, motion } from "framer-motion";
//COMPONENTS
import Sidebar from "../components/sidebar";
import Contact from "../components/contact";
import Drawer from "../components/drawer";
//IMAGES
import logoIta from "../assets/images/logoIta.png";
import logoEng from "../assets/images/logoEng.png";
import menuBurgher from "../assets/images/menu-burger.svg";
import cartIcon from "../assets/images/shopping-bag.svg";
import Link from "next/link";

export const Navbar = () => {
  //STORE
  const showDialogContact = useSelector(state => state.dialogContact.value);
  const showSideBar = useSelector(state => state.sideBar.value);
  const language = useSelector(state => state.language.value);
  const shopifyCheckout = useSelector(state =>
    JSON.parse(state.shopify.checkout)
  );
  const cart = useSelector(state => state.cart.value);
  const dispatch = useDispatch();

  //HOOKS
  const isDesktop = useMediaQuery(768);

  //FUNCTIONS
  const totalQuantity = shopifyCheckout?.lineItems
    .map(item => item.quantity)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <>
      <div className="px-5 md:px-5 left-0 top-0 w-full h-20 bg-white flex items-center justify-between z-30 customWidthHeader">
        <button
          className="text-black font-semibold text-xs md:text-sm"
          onClick={() => dispatch(setSideBarShow(!showSideBar))}
        >
          {isDesktop ? (
            <div style={{ fontSize: "10px" }}>MENU</div>
          ) : (
            <img src={menuBurgher.src} width={15} alt="burger-icon" />
          )}
        </button>

        <Link href="/">
          <button>
            <div className="flex flex-col justify-center items-center">
              {language === "it" ? (
                <img className="logo" src={logoIta.src} alt="indice-logo" />
              ) : (
                <img className="logo" src={logoEng.src} alt="indice-logo" />
              )}
            </div>
          </button>
        </Link>
        <button
          className="text-black font-semibold text-xs md:text-sm"
          style={{ fontSize: "10px" }}
          onClick={() => dispatch(setCart(shopifyCheckout))}
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
              dispatch(setCart(null));
            }}
            setShowCart={r => dispatch(setCart(r))}
          />
        )}
      </div>
      <AnimatePresence>
        {showSideBar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween" }}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            className="fixed top-0 right-0 h-full w-full z-10"
            onClick={() => {
              dispatch(setSideBarShow(false));
            }}
          />
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
              dispatch(setCart(null));
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>{showSideBar && <Sidebar />}</AnimatePresence>
      <AnimatePresence>
        {cart && (
          <Drawer
            handleClose={() => {
              dispatch(setCart(null));
            }}
            setShowCart={r => dispatch(setCart(r))}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showDialogContact && (
          <Contact setShown={dispatch(setDialogContactShow(true))} />
        )}
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
  );
};
