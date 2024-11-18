import { useEffect, useState } from "react";
import useWindowWidth from "./useWindowWidth";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (windowWidth <= 492) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [windowWidth])

    return isMobile;
}

export default useIsMobile;