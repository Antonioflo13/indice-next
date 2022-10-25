import React, { useState, useEffect } from "react";
import { animated, useSpring, config } from "react-spring";
import { useGesture } from "react-use-gesture";
// @ts-ignore
import clamp from "lodash-es/clamp";

type Mode = "collapsed" | "expanded";
type Expanded = true | false;

interface Props {
  height: number;
  defaultMode?: Mode;
  mode?: Mode;
  onModeChange?: (mode: Mode) => void;
  style?: React.CSSProperties;
  isExpanded(Expanded: Expanded): any;
  children: JSX.Element;
}

const getY = (height: number, mode: Mode): number => {
  if (mode === "collapsed") {
    return height - 150;
  }
  return height - height + 70;
};

const BottomSheet: React.FC<Props> = ({
  children,
  height,
  defaultMode = "collapsed",
  style,
  onModeChange,
  isExpanded,
}) => {
  const [mode, setMode] = useState(defaultMode);
  const [{ y }, set] = useSpring(() => ({
    y: getY(height, mode),
    config: config.stiff,
  }));
  const collapsedY = getY(height, "collapsed");
  const expandedY = getY(height, "expanded");
  let body = document.querySelector("body");

  useEffect(() => {
    set({ y: mode === "collapsed" ? collapsedY : expandedY });
    if (mode === "collapsed") {
      isExpanded(true);
      if (body) {
        body.style.overflow = "hidden";
      }
    } else {
      isExpanded(false);
      if (body) {
        body.style.overflow = "hidden";
      }
    }
  }, [mode, collapsedY, expandedY, set]);

  useEffect(() => {
    if (onModeChange) {
      onModeChange(mode);
    }
  }, [mode, onModeChange]);

  const calculateNextY = (
    down: boolean,
    currentY: number,
    deltaY: number,
    velocity: number
  ) => {
    if (down) {
      return currentY + deltaY;
    }

    const threshold = 100 / velocity;

    if (mode === "expanded") {
      return deltaY > threshold ? collapsedY : expandedY;
    }

    if (mode === "collapsed") {
      let body = document.querySelector("body");
      if (body) {
        body.style.overflow = "hidden";
      }
      return deltaY < -threshold ? expandedY : collapsedY;
    }

    return getY(height, mode);
  };

  const bind = useGesture({
    onDrag: ({ down, delta: [_, deltaY], velocity, temp = y.getValue() }) => {
      velocity = clamp(velocity, 1, 0.5);

      const threshold = 100 / velocity;

      if (!down) {
        if (mode === "expanded" && deltaY > threshold) {
          setMode("collapsed");
        } else if (mode === "collapsed" && deltaY < -threshold) {
          setMode("expanded");
        }
      }

      const nextY = calculateNextY(down, temp, deltaY, velocity);

      set({
        y: nextY,
        config: {
          mass: velocity,
          tension: 500 * velocity,
          friction: 80,
        },
      });

      return temp;
    },
    onHover: ({ hovering }) => {
      if (mode === "collapsed") {
        set({
          y: hovering ? getY(height, mode) - 10 : getY(height, mode),
        });
      }
    },
  });

  return (
    <animated.div
      {...bind()}
      style={{
        height,
        transform: y.interpolate(y => `translateY(calc(${y}px))`),
        ...style,
      }}
    >
      {children}
    </animated.div>
  );
};

export default BottomSheet;
