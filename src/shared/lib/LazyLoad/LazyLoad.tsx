import { ReactNode, useEffect, useRef, useState } from "react";

interface LazyLoadProps {
  offset?: number;
  children?: ReactNode;
}

export default function LazyLoad({ offset = 0, children }: LazyLoadProps) {
  const [enteredViewport, setEnteredViewport] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapperEl = wrapperRef.current;
    if (!wrapperEl) {
      return;
    }

    const callback: IntersectionObserverCallback = ([entry], observer) => {
      if (entry.isIntersecting) {
        setEnteredViewport(true);
        observer.unobserve(wrapperEl);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: `0px 0px ${offset}px`,
    });

    observer.observe(wrapperEl);

    return () => {
      observer.unobserve(wrapperEl);
    };
  }, [wrapperRef, offset]);

  return <div ref={wrapperRef}>{enteredViewport && children}</div>;
}
