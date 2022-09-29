import { useEffect, useState } from "react";

const useMediaQuery = width => {
  const [isWidth, setIsWidth] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", e => {
      setIsWidth(e.target.innerWidth >= width);
    });
  }, [isWidth]);

  return isWidth;
};

export default useMediaQuery;
