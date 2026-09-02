import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPixelEvent } from "../utils/metaPixel";

const ScrollToTop = () => {
    const { pathname, search } = useLocation();
    const isFirstRender = useRef(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Avoid duplicating the initial PageView from index.html on first load
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        trackPixelEvent('PageView');
    }, [pathname, search]);

    return null;
};

export default ScrollToTop;

