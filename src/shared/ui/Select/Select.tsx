import { useState } from "react";
import clsx from "clsx";

import { usePageScrollLock } from "@shared/hooks/usePageScrollLock";

import s from "./Select.module.scss";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  options: Option[];
  onChange: (option: Option) => void;
  withOverlay?: boolean;
  headClassName?: string;
}

export default function Select({
  value,
  options,
  onChange,
  withOverlay = false,
  headClassName,
}: SelectProps) {
  const [open, setOpen] = useState(false);

  usePageScrollLock(open);

  const onOptionClick = (option: Option) => {
    setOpen(false);
    onChange(option);
  };

  const activeOption = options.find((option) => option.value === value);

  return (
    <>
      <div
        className={clsx(
          s.overlay,
          withOverlay && s.overlayAllowed,
          open && s.overlayVisible
        )}
        onClick={() => setOpen(false)}
      />
      <div className={clsx(s.wrapper, open && s.bodyVisible)}>
        <button
          className={clsx(s.head, headClassName)}
          onClick={() => setOpen(true)}
        >
          {activeOption?.label}
        </button>

        <ul className={s.body}>
          {options.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => onOptionClick(option)}
                className={clsx(
                  s.option,
                  value === option.value && s.activeOption
                )}
                disabled={value === option.value}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
