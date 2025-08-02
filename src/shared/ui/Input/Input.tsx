import { ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { getWidthWithMargin } from "./helpers/getWidthWithMargin";

import s from "./Input.module.scss";

interface CustomSearchInputProps {
  endAdornment?: ReactNode;
  wrapperClassName?: string;
}

type SearchInputProps = React.ComponentProps<"input"> & CustomSearchInputProps;

export default function Input({
  wrapperClassName,
  type,
  className,
  endAdornment,
  ...otherProps
}: SearchInputProps) {
  const [paddingRight, setPaddingRight] = useState(16);
  const endAdornmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const endAdornmentEl = endAdornmentRef.current;
    if (!endAdornmentEl) {
      return setPaddingRight(16);
    }

    const width = getWidthWithMargin(endAdornmentEl);

    setPaddingRight(width + 16);
  }, [endAdornment]);

  return (
    <div className={clsx(s.wrapper, wrapperClassName)}>
      <input
        type={type}
        {...otherProps}
        className={clsx(s.input, className)}
        style={{ paddingRight }}
      />

      {endAdornment && (
        <div ref={endAdornmentRef} className={s.endAdornment}>
          {endAdornment}
        </div>
      )}
    </div>
  );
}
