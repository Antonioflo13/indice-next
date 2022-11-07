//REACT
import React, { useEffect } from "react";
//STORE
import { useDispatch, useSelector } from "react-redux";
import { setDialogContactShow } from "../store/modules/dialogContact";
import { setSideBarShow } from "../store/modules/sideBar";
import { setCartContent, setShowCart } from "../store/modules/cart";
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
import { getCookie } from "../utils/cookie";

export const Navbar = () => {
  //STORE
  const showDialogContact = useSelector(state => state.dialogContact.value);
  const showSideBar = useSelector(state => state.sideBar.value);
  const language = useSelector(state => state.language.value);

  const cart = useSelector(state => JSON.parse(state.cart.value));
  const showCart = useSelector(state => state.cart.show);
  const dispatch = useDispatch();

  //HOOKS
  const isDesktop = useMediaQuery(768);

  // FUNCTIONS
  const totalQuantity = cart?.lineItems
    .map(item => item.quantity)
    .reduce((prev, curr) => prev + curr, 0);

  // USEEFFECT
  useEffect(() => {
    let cartContent = getCookie("cart");
    if (cartContent) {
      dispatch(setCartContent(cartContent));
    }
  }, []);

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
          onClick={() => dispatch(setShowCart(true))}
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
        {showCart && (
          <Drawer
            handleClose={() => {
              dispatch(setShowCart(false));
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
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween" }}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            className="fixed top-0 right-0 h-full w-full z-10"
            onClick={() => {
              dispatch(setShowCart(false));
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>{showSideBar && <Sidebar />}</AnimatePresence>
      <AnimatePresence>
        {showCart && (
          <Drawer
            handleClose={() => {
              dispatch(setShowCart(false));
            }}
            setShowCart={r => dispatch(setShowCart(r))}
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
