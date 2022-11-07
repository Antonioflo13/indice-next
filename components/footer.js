import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Link from "./LanguagesLink";
import { FormattedMessage as OriginalFormattedMessage } from "react-intl";
import logo from "../assets/images/logo-black.png";
import { stores } from "../data/stores";
import useMediaQuery from "../hooks/useMediaQuery";

const Footer = () => {
  const [accordion, setAccordion] = React.useState({
    contact: false,
    support: false,
    wherIs: false,
  });

  const isDesktop = useMediaQuery(768);

  return (
    <>
      <div className="backgroudcolorfooter px-5">
        <div className="w-full items-center justify-center pt-10 pb-4 text-black">
          <div
            className={`${
              isDesktop
                ? "customWidthFooter"
                : "grid gap-y-6 md:grid-cols-5 lg:grid-cols-5 md:gap-x-12 md:gap-y-24 whitespace-pre-line"
            }`}
          >
            <div className="flex justify-center noDesktop">
              <div className="block w-16">
                <img src={logo.src} alt="indice-logo" />
              </div>
            </div>
            <div className="flex flex-col accordionDesktop">
              <div className="font-bold uppercase text-sm">
                <FormattedMessage id="footer.contacts.title" />
              </div>
              <div className="text-xs">
                <FormattedMessage id="footer.contacts.email" />
              </div>
              {stores.map(store => (
                <div key={store.id} style={{ marginTop: "10px" }}>
                  <div className="font-bold text-sm">{store.name}</div>
                  <div className="text-xs">{store.linkCall}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col accordionMobile mobileCenterSocial">
              <>
                <a
                  href="https://www.facebook.com/indice.vision"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  className="ml-2"
                  href="https://www.instagram.com/indice.vision"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  className="ml-2"
                  href="https://www.linkedin.com/company/indicevision"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </>
            </div>
            <div className="flex flex-col accordionMobile">
              <div
                className="containerAccordion"
                onClick={() =>
                  setAccordion({ ...accordion, contact: !accordion.contact })
                }
              >
                <div className="font-bold uppercase text-sm">
                  <FormattedMessage id="footer.contacts.title" />
                </div>
                {accordion.contact ? (
                  <FontAwesomeIcon icon={faMinus} style={{width: "10px"}} className="containerIcon" />
                ) : (
                  <FontAwesomeIcon icon={faPlus} style={{width: "10px"}}  className="containerIcon" />
                )}
              </div>
              {accordion.contact && (
                <>
                  <div className="text-xs">
                    <FormattedMessage id="footer.contacts.email" />
                  </div>
                  {stores.map(store => (
                    <div key={store.id} style={{ marginTop: "10px" }}>
                      <div className="font-bold text-sm">{store.name}</div>
                      <div className="text-xs">{store.linkCall}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="flex flex-col accordionDesktop">
              <div className="font-bold uppercase text-sm">
                <FormattedMessage id="footer.social.title" />
              </div>
              <div className="flex">
                <a
                  href="https://www.facebook.com/indice.vision"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  className="ml-2"
                  href="https://www.instagram.com/indice.vision"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  className="ml-2"
                  href="https://www.linkedin.com/company/indicevision"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </div>
            <div className="flex flex-col noMobile">
              <div className="block w-16">
                <img src={logo.src} alt="indice logo" />
              </div>
            </div>
            <div className="flex flex-col accordionDesktop">
              <div className="font-bold uppercase text-sm">
                <FormattedMessage id="footer.support.title" />
              </div>
              <Link to="/faq">
                <div className="text-xs">
                  <FormattedMessage id="footer.support.faq" />
                </div>
              </Link>
              <a
                href="https://indice-vision.myshopify.com/15652721/policies/terms-of-service.html?locale=en"
                target="_blank"
              >
                <div className="text-xs">
                  <FormattedMessage id="footer.support.terms_and_conditions" />
                </div>
              </a>
              <a
                href="https://www.iubenda.com/privacy-policy/22164738"
                target="_blank"
              >
                <div className="text-xs">
                  <FormattedMessage id="footer.support.privacy_policy" />
                </div>
              </a>
              <a
                href="https://www.iubenda.com/privacy-policy/22164738/cookie-policy"
                target="_blank"
              >
                <div className="text-xs">
                  <FormattedMessage id="footer.support.cookie_policy" />
                </div>
              </a>
            </div>
            <div className="flex flex-col accordionMobile">
              <div
                className="containerAccordion"
                onClick={() =>
                  setAccordion({ ...accordion, support: !accordion.support })
                }
              >
                <div className="font-bold uppercase text-sm">
                  <FormattedMessage id="footer.support.title" />
                </div>
                {accordion.support ? (
                  <FontAwesomeIcon icon={faMinus} style={{width: "10px"}}  className="containerIcon" />
                ) : (
                  <FontAwesomeIcon icon={faPlus}  style={{width: "10px"}}  className="containerIcon" />
                )}
              </div>
              {accordion.support && (
                <>
                  <Link to="/faq">
                    <div className="text-xs">
                      <FormattedMessage id="footer.support.faq" />
                    </div>
                  </Link>
                  <a
                    href="https://indice-vision.myshopify.com/15652721/policies/terms-of-service.html?locale=en"
                    target="_blank"
                  >
                    <div className="text-xs">
                      <FormattedMessage id="footer.support.terms_and_conditions" />
                    </div>
                  </a>
                  <a
                    href="https://www.iubenda.com/privacy-policy/22164738"
                    target="_blank"
                  >
                    <div className="text-xs">
                      <FormattedMessage id="footer.support.privacy_policy" />
                    </div>
                  </a>
                  <a
                    href="https://www.iubenda.com/privacy-policy/22164738/cookie-policy"
                    target="_blank"
                  >
                    <div className="text-xs">
                      <FormattedMessage id="footer.support.cookie_policy" />
                    </div>
                  </a>
                </>
              )}
            </div>
            <div className="flex flex-col accordionDesktop">
              <div className="font-bold uppercase text-sm">
                <FormattedMessage id="footer.location.title" />
              </div>
              <div className="text-xs">
                {stores.map(store => (
                  <div key={store.id} style={{ marginTop: "10px" }}>
                    <div className="font-bold text-sm">{store.name}</div>
                    <div className="text-xs">{store.address}</div>
                    <div className="text-xs">{store.otheraddress}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col accordionMobile">
              <div
                className="containerAccordion"
                onClick={() =>
                  setAccordion({ ...accordion, wherIs: !accordion.wherIs })
                }
              >
                <div className="font-bold uppercase text-sm">
                  <FormattedMessage id="footer.location.title" />
                </div>
                {accordion.wherIs ? (
                  <FontAwesomeIcon icon={faMinus} style={{width: "10px"}} className="containerIcon" />
                ) : (
                  <FontAwesomeIcon icon={faPlus} style={{width: "10px"}}  className="containerIcon" />
                )}
              </div>
              {accordion.wherIs && (
                <div className="text-xs">
                  {stores.map(store => (
                    <div key={store.id} style={{ marginTop: "10px" }}>
                      <div className="font-bold text-sm">{store.name}</div>
                      <div className="text-xs">{store.address}</div>
                      <div className="text-xs">{store.otheraddress}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center pt-20 pb-4 text-black">
          <div className="w-10/12 grid gap-y-16 md:grid-cols-1  whitespace-pre-line  justify-center">
            <div className="w-full lg:col-span-2  justify-center">
              <div className="text-3xs textCenterDesktop  justify-center">
                <FormattedMessage id="footer.legal" />
              </div>
            </div>
          </div>
        </div>
        <style jsx="true">
          {`
            .backgroudcolorfooter {
              background-color: #f8f8f8;
            }

            .containerAccordion {
              display: flex;
              justify-content: space-between;
            }

            .containerIcon {
              margin-left: 4px;
              cursor: pointer;
            }

            .customWidthFooter {
              max-width: 90rem;
              margin-left: auto;
              margin-right: auto;
              display: flex;
              justify-content: space-between;
            }

            @media (min-width: 768px) {
              .accordionMobile {
                display: none;
              }

              .accordionDesktop {
                display: block;
              }

              .textCenterDesktop {
                text-align: center;
              }

              .noDesktop {
                display: none;
                margin-bottom: 10px;
                margin-top: 10px;
              }
            }

            @media (max-width: 767px) {
              .justifyMobileEnd {
                justify-content: flex-start !important;
              }

              .accordionMobile {
                display: block;
              }

              .accordionDesktop {
                display: none;
              }

              .noMobile {
                display: none;
              }

              .mobileCenterSocial {
                display: flex;
                flex-direction: inherit;
                justify-self: center;
              }
            }
          `}
        </style>
      </div>
    </>
  );
};

export default Footer;

const FormattedMessage = ({ values, ...props }) => (
  <OriginalFormattedMessage
    values={{
      b: chunk => <b>{chunk}</b>,
      ...values,
    }}
    {...props}
  />
);
