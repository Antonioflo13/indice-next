import React from "react";
import { animated, useSpring } from "react-spring";
import { useDrag } from "@use-gesture/react";

const AnimatedComponent = ({ children }) => {
  const [{ y }, api] = useSpring(() => ({ y: 0 }));
  const bind = useDrag(({ movement: [y] }) => {
    console.log(y);
    api.start({ y: y });
    let height = window.innerHeight;
    console.log(height, "he");
    if (y > 20) {
      api.start({ y: -(height - 275) });
    } else {
      api.start({ y: y });
    }
  });
  return (
    <animated.div {...bind()} style={{ y, touchAction: "none" }}>
      {children}
    </animated.div>
  );
};
export default AnimatedComponent;
