import { useEffect, useRef } from "react";

import { getScrollbarWidth } from "@shared/utils/getScrollbarWidth";

export const useHandlePageScrollLock = () => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const headEl = headerRef.current;
    if (!headEl) {
      return;
    }

    const callback: MutationCallback = (mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type !== "attributes") {
          continue;
        }

        if (document.body.style.overflow === "hidden") {
          headEl.style.marginRight = `${getScrollbarWidth()}px`;
        } else {
          headEl.style.marginRight = `0px`;
        }
      }
    };

    const observer = new MutationObserver(callback);

    const config = { attributes: true, childList: false, subtree: false };

    observer.observe(document.body, config);

    return () => {
      observer.disconnect();
    };
  }, []);

  return headerRef;
};
