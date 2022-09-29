import React from "react";

const Image = ({ url, styleClass }) => {
  return (
    <div
      className={`md:w-1/2 md:h-screen bg-cover pt-50/100 md:pt-0 bg-center ${styleClass}`}
      style={{ backgroundImage: `url(${require(`../images/${url}`)})` }}
    ></div>
  );
};

export default Image;
