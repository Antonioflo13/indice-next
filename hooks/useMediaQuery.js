import {useEffect, useState} from "react";

const useMediaQuery = (width) => {
    const [isWidth, setIsWidth] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', (e) => {
            setIsWidth(e.target.innerWidth >= width);
        });
    }, [isWidth]);

    return isWidth;
}

export default useMediaQuery;