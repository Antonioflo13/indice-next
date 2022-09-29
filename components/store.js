import React from "react";
import { stores } from "../data/stores";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";

const Store = ({ isAbout, isModal, selectSingleIcon }) => {
  return (
    <>
      <div
        className={`${
          isAbout
            ? ""
            : "mt-8 grid grid-rows-3 md:grid-rows-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-4"
        }`}
        style={{ cursor: "pointer" }}
      >
        {stores.map((store, index) => (
          <div className="paddingTwo" key={index}>
            <a
              href={
                isModal && !isAbout
                  ? selectSingleIcon.id === 0
                    ? store.linkCall
                    : selectSingleIcon.id === 1
                    ? store.linkMap
                    : store.linkMex
                  : store.linkMap
              }
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={`mt-4 grid grid-cols-2 customWidthModal padding ${
                  isModal ? "removeMobile" : ""
                }`}
                key={index}
              >
                <div style={{ width: "85px", height: "85px" }}>
                  <img
                    src={store.image.src.src}
                    alt={store.image.alt}
                    style={{
                      borderRadius: "1rem",
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <div className={`${isModal ? "containerStores" : ""}`}>
                  <motion.div className="text-indice-red text-xs font-bold italic mackay noToHead">
                    <FormattedMessage id={store.name} />
                  </motion.div>
                  <motion.div
                    className="text-xs whitespace-pre-line fontCustom noToHead"
                    style={{ whiteSpace: `${isAbout ? "nowrap" : ""}` }}
                  >
                    <FormattedMessage id={store.address} />
                  </motion.div>
                  <motion.div
                    className="text-xs whitespace-pre-line fontCustom noToHead"
                    style={{ whiteSpace: `${isAbout ? "nowrap" : ""}` }}
                  >
                    <FormattedMessage id={store.otheraddress} />
                  </motion.div>
                  <motion.div
                    className="text-xs whitespace-pre-line fontCustom noToHead"
                    style={{ whiteSpace: `${isAbout ? "nowrap" : ""}` }}
                  >
                    <FormattedMessage id={store.email} />
                  </motion.div>
                  <motion.div
                    className="text-xs whitespace-pre-line fontCustom noToHead"
                    style={{ whiteSpace: `${isAbout ? "nowrap" : ""}` }}
                  >
                    <FormattedMessage id={store.cell} />
                  </motion.div>
                </div>
              </div>
              {isModal && (
                <div className="flex-1 containerMobile">
                  <motion.div className="text-xl">
                    <div style={{ display: "flex" }}>
                      <img
                        src={selectSingleIcon.iconSrc}
                        alt={selectSingleIcon.alt}
                        style={{ width: "45px", paddingRight: "15px" }}
                      />
                      <FormattedMessage id={store.name} />
                    </div>
                  </motion.div>
                </div>
              )}
            </a>
          </div>
        ))}
      </div>
      <style jsx="true">
        {`
          .padding {
            padding-right: 35px;
          }
          .paddingTwo {
            padding-right: 40px;
          }
          .noToHead {
            white-space: nowrap;
          }
          .containerMobile {
            display: none;
          }
          @media (max-width: 350px) {
            .fontCustom {
              font-size: 0.65rem;
            }
          }

          @media only screen and (min-device-width: 767px) and (max-device-width: 1023px) {
            .containerStores {
              width: 300px;
            }
          }

          @media (max-width: 767px) {
            .customWidthModal {
              max-width: 230px;
            }
            .removeMobile {
              display: none;
            }
            .containerMobile {
              display: block;
            }
            .padding {
              padding-right: 0px;
            }
            .paddingTwo {
              padding-right: 0px;
            }
          }

          @media (min-width: 768px) {
            .customWidthModal {
              width: 240px;
            }
            .fontCustom {
              font-size: 0.65rem;
            }
          }

          @media (min-width: 992px) {
            .customWidthModal {
              max-width: 250px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Store;
