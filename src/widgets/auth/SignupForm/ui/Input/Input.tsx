import { type ReactNode, type HTMLProps, useEffect, useRef } from "react";
import clsx from "clsx";

import s from "./Input.module.scss";

interface InputProps extends HTMLProps<HTMLInputElement> {
  endAdornment?: ReactNode;
}

export default function Input({
  className,
  endAdornment,
  ...otherProps
}: InputProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const endAdornmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapperEl = wrapperRef.current;
    const endAdornmentEl = endAdornmentRef.current;
    if (!wrapperEl || !endAdornmentEl) {
      return;
    }

    const inputEl = wrapperEl.querySelector("input");

    if (!inputEl) {
      return console.error("Input element not found");
    }

    inputEl.style.paddingRight = `${endAdornmentEl.offsetWidth + 16}px`;
  }, [wrapperRef, endAdornment, endAdornmentRef]);

  return (
    <div className={s.wrapper} ref={wrapperRef}>
      <input type="text" className={clsx(s.input, className)} {...otherProps} />
      {!!endAdornment && (
        <div className={s.endAdornmentWrapper} ref={endAdornmentRef}>
          {endAdornment}
        </div>
      )}
    </div>
  );
}
