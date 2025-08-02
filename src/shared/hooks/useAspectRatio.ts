import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

export const useAspectRatio = (aspectRatio: string) => {
  const ref = useRef<HTMLElement>(null);

  const [width, height] = aspectRatio.split("/");
  if (!width || !height || isNaN(+width) || isNaN(+height)) {
    throw new Error("Set aspect-ratio in format: {width} / {height}");
  }

  const updateElHeight = useCallback(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    el.style.height = `${(el.offsetWidth * +height) / +width}px`;
  }, [ref, width, height]);

  useLayoutEffect(() => {
    updateElHeight();
  }, [updateElHeight]);

  useEffect(() => {
    const onResize = () => {
      updateElHeight();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [updateElHeight]);

  return ref;
};
