import React from "react";
import Link from "next/link";

const LanguagesLink = ({ to, ref, ...rest }) => {
  // Empty links should just not do anything
  if (!to) {
    return rest.children;
  }

  return (
    <Link
      exit={{ length: 0.15 }}
      entry={{ delay: 0.15, length: 0.3 }}
      {...rest}
      href="/"
    />
  );
};

export default LanguagesLink;
