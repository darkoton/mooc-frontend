import { type Dispatch, type SetStateAction, useEffect } from "react";

import { breakpoints } from "@shared/config/appBreakpoints";

export const useCloseUserMenu = (
  setShowUserMenu: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth <= breakpoints.lg) {
        setShowUserMenu(false);
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
};
