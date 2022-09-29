import Link from "./LanguagesLink";
import React from "react";
import { FormattedMessage } from "react-intl";
import iconHome from "../images/home.svg";
import { motion } from "framer-motion";
import Image from "./image-shop";

const PageTitleImage = ({
  title,
  titleValues,
  subtitle,
  subtitle1,
  subtitleValues,
  breadcrumbs,
  accessory,
}) => (
  <div>
    {breadcrumbs && Array.isArray(breadcrumbs) && (
      <div className="mb-4 flex items-center">
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center justify-center rounded-full text-2xs text-white"
            style={{
              width: "1rem",
              height: "1rem",
            }}
          >
            <img style={{ marginRight: "1px" }} src={iconHome} alt="" />
          </motion.div>
        </Link>
        <div className="flex flex-wrap items-center mt-1 ml-2">
          {breadcrumbs.map((b, i) => (
            <div key={`${i}`} className="flex items-center">
              {i !== 0 && <div className="ml-1">/</div>}
              <div
                className={`ml-1 text-2xs uppercase ${
                  i + 1 === breadcrumbs.length ? "font-bold" : ""
                }`}
              >
                {b.link ? (
                  <Link to={b.link}>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <FormattedMessage id={b.title} />
                    </motion.div>
                  </Link>
                ) : (
                  <FormattedMessage id={b.title} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
    <div className="text-xl md:text-3xl font-semibold leading-tight monument whitespace-pre-line">
      {React.isValidElement(title) ? (
        title
      ) : (
        <FormattedMessage
          id={title}
          values={{
            ...titleValues,
            b: chunk => <Bold>{chunk}</Bold>,
          }}
        />
      )}
    </div>
    {accessory && <div className="my-4">{accessory}</div>}
    {subtitle && subtitle1 && (
      <div className="mt-4">
        {React.isValidElement(subtitle) ? (
          subtitle
        ) : (
          <div className="text-xs whitespace-pre-line">
            <FormattedMessage
              id={subtitle}
              values={{
                ...subtitleValues,
                b: chunk => <span className="font-bold">{chunk}</span>,
              }}
            />
            <Image url="shop.jpg" styleClass="mobile-image" />
            <FormattedMessage
              id={subtitle1}
              values={{
                ...subtitleValues,
                b: chunk => <span className="font-bold">{chunk}</span>,
              }}
            />
          </div>
        )}
      </div>
    )}
  </div>
);

export default PageTitleImage;

export const Bold = ({ children }) => (
  <span className="text-2xl md:text-4xl font-black italic mackay text-indice-red">
    {children}
  </span>
);
