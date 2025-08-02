import { useEffect, type RefObject } from "react";

export const useAccordionHeight = (
  detailsRef: RefObject<HTMLDivElement | null>,
  open: boolean
) => {
  useEffect(() => {
    const detailsEl = detailsRef.current;
    if (!detailsEl) {
      return;
    }

    if (open) {
      const detailsElHeight = detailsEl.scrollHeight;
      console.log({ detailsElHeight });
      detailsEl.style.maxHeight = `${detailsElHeight + 20}px`;
    } else {
      detailsEl.style.maxHeight = `0px`;
    }
  }, [open, detailsRef]);
};
