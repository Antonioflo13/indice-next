import React, { useEffect } from "react";
import debounce from "lodash/debounce";

const PagedLayout = ({ children }) => {
  useEffect(() => {
    let updating = false;
    const updateScroll = debounce(() => {
      // Prevents double calls
      if (updating) {
        return;
      }
      updating = true;
      setTimeout(() => {
        updating = false;
      }, 100);

      const height = window.innerHeight;
      const offset = window.scrollY;
      const pageOffset = window.scrollY % window.innerHeight;
      // Remember to use smoothscroll-polyfill
      if (pageOffset < height / 2) {
        window.scroll({ top: offset - pageOffset, behavior: "smooth" });
      } else {
        window.scroll({
          top: offset + (height - pageOffset),
          behavior: "smooth",
        });
      }
    }, 100);
    const handler = () => {
      updateScroll();
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);
  return children;
};

export default PagedLayout;
