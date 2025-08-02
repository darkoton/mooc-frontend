import { type HTMLProps, useId } from "react";
import clsx from "clsx";

import s from "./RadioInput.module.scss";

interface RadioInputProps extends HTMLProps<HTMLInputElement> {
  label: string;
}

export default function RadioInput({
  label,
  className,
  ...otherProps
}: RadioInputProps) {
  const id = useId();

  return (
    <div className={clsx(s.wrapper, className)}>
      <input {...otherProps} type="checkbox" id={id} className={s.input} />
      <label htmlFor={id} className={s.label}>
        <span className={s.mark} />
        {label}
      </label>
    </div>
  );
}
