import { useEffect } from "react";

export const usePosition = (
  anchorElRef: React.RefObject<HTMLElement | null>,
  wrapperRef: React.RefObject<HTMLDivElement | null>,
  position: string
) => {
  useEffect(() => {
    const anchorEl = anchorElRef.current;
    const wrapperEl = wrapperRef.current;
    if (!anchorEl || !wrapperEl) {
      return;
    }

    const updatePosition = () => {
      const { x, width, y, height } = anchorEl.getBoundingClientRect();
      if (position === "bottom") {
        wrapperEl.style.top = `${y + height + document.documentElement.scrollTop + 20}px`;
      } else {
        wrapperEl.style.top = `${y + document.documentElement.scrollTop - wrapperEl.offsetHeight - 20}px`;
      }
      wrapperEl.style.left = `${x + width / 2}px`;
      wrapperEl.style.transform = "translateX(-50%)";
    };
    updatePosition();

    const onResize = () => {
      window.requestAnimationFrame(() => {
        updatePosition();
      });
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [anchorElRef, wrapperRef, position]);
};
