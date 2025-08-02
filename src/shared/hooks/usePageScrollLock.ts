import { useEffect } from "react";

import { getScrollbarWidth } from "@shared/utils/getScrollbarWidth";

export function usePageScrollLock(lock = true) {
  useEffect(() => {
    if (lock) {
      setTimeout(() => {
        const scrollbarWidth = getScrollbarWidth();
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }, 0);
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, [lock]);
}
