//REACT
import React, {useContext, useMemo, useState} from "react";
//HOOKS
import useMediaQuery from "../hooks/useMediaQuery";
//FRAMER-MOTION
import {AnimatePresence, motion} from "framer-motion";
//COMPONENTS
import Sidebar from "../components/sidebar";
import Contact from "../components/contact";
import Drawer from "../components/drawer";
import SharedStateContext from "../components/shared-state-context";
//IMAGES
import logoIta from "../assets/images/logoIta.png";
import logoEng from "../assets/images/logoEng.png";
import menuBurgher from "../assets/images/menu-burger.svg";
import cartIcon from "../assets/images/shopping-bag.svg";
import Link from "next/link";

export const Navbar = () => {
    const [contactShown, _setContactShown] = useState(false);
    const [contactProduct, setContactProduct] = useState(null);
    const [cart, setCart] = useState(null);
    const [sidebarShown, _setSidebarShown] = useState(false);
    const isDesktop = useMediaQuery(768);
    const {shopifyCheckout, language, setLanguage} = useContext(SharedStateContext);

    const totalQuantity = shopifyCheckout?.lineItems
        .map(item => item.quantity)
        .reduce((prev, curr) => prev + curr, 0);

    //USE-MEMO
    const setSidebarShown = useMemo(
        () => sidebarShown => {
            // Prevents scrolling of contents behind the sidebar
            document.body.style.overflow = sidebarShown ? "hidden" : "visible";
            _setSidebarShown(sidebarShown);
        },
        [_setSidebarShown]
    )

    const setContactShown = useMemo(
        () => (contactShown, contactProduct = null) => {
            // Prevents scrolling of contents behind the sidebar
            document.body.style.overflow = contactShown ? "hidden" : "visible";
            _setContactShown(contactShown);
            setContactProduct(contactProduct);
        },
        [_setContactShown, setContactProduct]
    )

    return (
        <SharedStateContext.Provider
            value={{
                sidebarShown,
                setSidebarShown,
                contactShown,
                contactProduct,
                setContactShown,
                cart,
                setCart,
                language,
                setLanguage
            }}
        >
            <div
                className="px-5 md:px-5 left-0 top-0 w-full h-20 bg-white flex items-center justify-between z-30 customWidthHeader">
                <button
                    className="text-black font-semibold text-xs md:text-sm"
                    onClick={() => setSidebarShown(!sidebarShown)}
                >
                    {isDesktop ? (
                        <div style={{fontSize: "10px"}}>MENU</div>
                    ) : (
                        <img src={menuBurgher.src} width={15} alt="burger-icon"/>
                    )}
                </button>

                    <Link href='/'>
                        <button>
                        <div className="flex flex-col justify-center items-center">
                            {language === "it" ? (
                                <img className="logo" src={logoIta.src} alt="indice-logo"/>
                            ) : (
                                <img className="logo" src={logoEng.src} alt="indice-logo"/>
                            )}
                        </div>
                        </button>
                    </Link>
                <button
                    className="text-black font-semibold text-xs md:text-sm"
                    style={{fontSize: "10px"}}
                    onClick={() => setCart(shopifyCheckout)}
                >
                    {isDesktop ? (
                        <div>CART ({totalQuantity ? totalQuantity : 0})</div>
                    ) : (
                        <>
                            <img src={cartIcon.src} width={15} alt="cart-icon"/>
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
            <AnimatePresence>
                {sidebarShown && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{type: "tween"}}
                        style={{backgroundColor: "rgba(0,0,0,0.5)"}}
                        className="fixed top-0 right-0 h-full w-full z-10"
                        onClick={() => {
                            setSidebarShown(false)
                        }}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {cart && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{type: "tween"}}
                        style={{backgroundColor: "rgba(0,0,0,0.5)"}}
                        className="fixed top-0 right-0 h-full w-full z-10"
                        onClick={() => {
                            setCart(false)
                        }}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>{sidebarShown && <Sidebar/>}</AnimatePresence>
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
                {contactShown && <Contact setShown={setContactShown}/>}
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
        </SharedStateContext.Provider>

    )
}