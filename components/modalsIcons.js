import React from "react";
import Modal from "./modal";
import Store from "./store";
import closeIcon from "../assets/images/cross.svg";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";

const ModalsIcons = ({ selectSingleIcon, setShown }) => {
  return (
    <>
      <Modal setShown={setShown} customWidthModal={true}>
        <div className="flex flex-col w-full">
          <div className="flex flex-col-reverse items-end">
            <button className="close-menu" onClick={() => setShown(false)}>
              <span>
                <img src={closeIcon.src} width={10} alt="cart-icon" />
              </span>
            </button>
          </div>
          <div className="flex-1">
            <motion.div className="text-indice-red text-xl font-bold italic mackay">
              <div style={{ display: "flex", marginTop: "20px" }}>
                <img
                  className="removeIconMobile"
                  src={selectSingleIcon.iconSrc.src}
                  alt={selectSingleIcon.alt}
                  style={{ width: "45px", paddingRight: "15px" }}
                />
                <p className="titleModal">
                  <FormattedMessage id={selectSingleIcon.text} />
                </p>
              </div>
            </motion.div>
          </div>
          <div className="mt-4">
            <motion.div className="text-xs mobileText">
              <FormattedMessage
                id="modal.subtile"
                values={{
                  b: chunk => <b>{chunk}</b>,
                }}
              />
            </motion.div>
          </div>
          <Store isModal={true} selectSingleIcon={selectSingleIcon} />
        </div>
      </Modal>
      <style jsx="true">
        {`
          @media (max-width: 767px) {
            .removeIconMobile {
              display: none;
            }
            .titleModal {
              width: 60%;
            }
            .mobileText {
              white-space: inherit;
            }
          }
        `}
      </style>
    </>
  );
};

export default ModalsIcons;
