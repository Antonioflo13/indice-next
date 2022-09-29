import { motion, useMotionValue } from "framer-motion";
import React from "react";

const LabelReverse = ({ children, disabled = false, style = {}, ...props }) => {
  const opacity = useMotionValue(disabled ? 0.6 : 1.0);
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      className="rounded-full bg-white pt-1 pb-px px-4 leading-5 text-indice-red font-bold text-xs uppercase"
      style={{ opacity, ...style }}
      {...props}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default LabelReverse;
