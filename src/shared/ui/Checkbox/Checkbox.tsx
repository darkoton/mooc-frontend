import { InputHTMLAttributes } from "react";

import s from "./Checkbox.module.scss";

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function Checkbox({ label, ...otherProps }: ICheckboxProps) {
  return (
    <label className={s.label}>
      <input type="checkbox" className={s.input} {...otherProps} />
      <span className={s.checkbox} />
      {label}
    </label>
  );
}

export default Checkbox;
