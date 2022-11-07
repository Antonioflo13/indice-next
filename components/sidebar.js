//REACT
import React, { useState } from "react";
//STORE
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../store/modules/language";
import { setSideBarShow } from "../store/modules/sideBar";
//MOTION
import { motion } from "framer-motion";
//INTL
import { FormattedMessage, useIntl } from "react-intl";
//ICONS
import Icons from "../data/Icons";
import closeIcon from "../assets/images/cross.svg";
import logo from "../assets/images/logo-black.png";
import shoppingBag from "../assets/images/shopping-bag-red.svg";
//COMPONENTS
import ModalsIcons from "./modalsIcons";
import LinkMenu from "./linkMenu";

const sidebarVariants = {
  hidden: { x: "-100%", transition: { type: "tween" } },
  shown: {
    x: "0",
    transition: { type: "tween", staggerChildren: 0.1, when: "beforeChildren" },
  },
};

const Sidebar = () => {
  //STORE
  const language = useSelector(state => state.language.value);
  const dispatch = useDispatch();

  //INTL
  const intl = useIntl();
  //STATE
  const [show, setShown] = useState(false);
  const [selectSingleIcon, setSelectSingleIcon] = useState();

  //FUNCTIONS
  const changeSidebar = () => {
    dispatch(setSideBarShow(false));
  };

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
          <img className="logoMenu" src={logo.src} alt="" />
          <button
            className="close-menu"
            onClick={() => dispatch(setSideBarShow(false))}
          >
            <img src={closeIcon.src} width={10} alt="cart-icon" />
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
              <LinkMenu to="/boutiques" sidebar>
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
              <button
                onClick={() => dispatch(setLanguage("it"))}
                className="button-it font-bold"
                style={{ color: `${language === "it" ? "#800000" : ""}` }}
              >
                IT
              </button>
              <span className="separator font-bold">|</span>

              <button
                onClick={() => dispatch(setLanguage("en"))}
                className="button-en font-bold"
                style={{ color: `${language === "en" ? "#800000" : ""}` }}
              >
                EN
              </button>
            </div>

            <div>
              <div className="flex justify-between">
                {Icons(intl).map((icon, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setShown(true);
                      setSelectSingleIcon(icon);
                    }}
                  >
                    <img
                      src={icon.iconSrc.src}
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
                  src={shoppingBag.src}
                  alt=""
                  style={{
                    width: "30px",
                    cursor: "pointer",
                    marginBottom: "80px",
                  }}
                  onClick={() => changeSidebar()}
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
  );
};

export default Sidebar;
