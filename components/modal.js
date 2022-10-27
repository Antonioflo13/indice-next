import { motion } from "framer-motion";
import React from "react";

const Modal = ({ children, setShown, customWidthModal }) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween" }}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        className="fixed top-0 right-0 h-full w-full z-40"
      ></motion.div>
      <motion.div
        variants={{
          hidden: {
            y: 50,
            opacity: 0,
            transition: { type: "tween" },
          },
          shown: {
            y: 0,
            opacity: 1,
            transition: {
              type: "tween",
            },
          },
        }}
        initial={"hidden"}
        animate={"shown"}
        exit={"hidden"}
        className="fixed flex items-center justify-center top-0 left-0 h-full w-full z-50"
        onClick={event => {
          // Prevents dismissal from children clicks
          if (event.target === event.currentTarget) {
            setShown(false);
          }
        }}
      >
        <div className="max-w-full max-h-full bg-white shadow-lg p-8 md:p-16 overflow-auto containerModal">
          {children}
        </div>
      </motion.div>
      <style jsx="true">
        {`
          .containerModal {
            padding: 2rem;
            width: 80%;
          }
          @media (max-width: 767px) {
            .containerModal {
              width: ${customWidthModal ? "100%" : "600px"};
              position: ${customWidthModal && "absolute"};
              bottom: ${customWidthModal && "-10px"};
              border-bottom-radius: ${customWidthModal && "none"};
            }
          }
          .containerModal {
            border-radius: 1rem;
            width: ${!customWidthModal ? "600px" : ""};
            max-width: ${!customWidthModal ? "95%" : ""};
          }
        `}
      </style>
    </div>
  );
};

export default Modal;
