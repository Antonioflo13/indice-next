import { motion, useMotionValue } from "framer-motion";
import React from "react";

const Label = ({ children, disabled = false, style = {}, ...props }) => {
  const opacity = useMotionValue(disabled ? 0.6 : 1.0);
  return (
    <motion.button
      className="rounded-full bg-indice-red pt-1 pb-px px-4 leading-5 text-white font-bold text-xs uppercase"
      style={{ opacity, ...style }}
      {...props}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default Label;
