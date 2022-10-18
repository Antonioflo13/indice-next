import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { motion } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";

const AnimatedPage = ({ children, margins, fullHeight, grey, noAnimate }) => {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const isDesktop = useMediaQuery(768);
  return (
    <>
      <motion.div
        animate={{
          opacity: 1.0,
          transition: { duration: !noAnimate && 0.15 },
        }}
        style={{ backgroundColor: "white" }}
        initial={false}
        className={classnames("w-full", {
          "bg-indice-grey": grey,
          "pt-10 md:pt-0": !fullHeight,
        })}
      >
        <>
          {margins ? (
            <div
              className={classnames(
                url.includes("product") && !isDesktop
                  ? "w-full"
                  : "w-full customStyle"
              )}
            >
              {children}
            </div>
          ) : (
            children
          )}
        </>
      </motion.div>
      <style jsx="true">
        {`
          .customStyle {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
            background-color: white;
            max-width: 90rem;
            margin-left: auto;
            margin-right: auto;
            padding-bottom: 2.25rem;
          }

          @media (max-width: 768px) {
            .customStyle {
              padding-left: 1rem;
              padding-right: 1rem;
              padding-bottom: 0rem;
            }
          }
        `}
      </style>
    </>
  );
};

AnimatedPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AnimatedPage;
