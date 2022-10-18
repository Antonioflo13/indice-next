import React from "react";
import {animated, useSpring} from 'react-spring';
import {useDrag} from "@use-gesture/react";

const AnimatedComponent = ({children}) => {
        const [{x, y}, api] = useSpring(() => ({x: 0, y: 0}));
        const bind = useDrag(({movement: [, y]}) => {
            console.log(y)
            api.start({y: y >= 0 ? 0 : y})
            let height = window.innerHeight;
            console.log(height, 'he');
            if (Math.sign(y) === -1 && y < -200) {
                api.start({y: -(height - 305)})
            } else if (y > 200) {
                api.start({y: 0})
            }
        });
        return (
            <animated.div {...bind()} style={{x, y, touchAction: 'none'}}>{children}</animated.div>
        )
    }
;
export default AnimatedComponent;