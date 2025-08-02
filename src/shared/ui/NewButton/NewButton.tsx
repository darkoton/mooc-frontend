import { type ComponentProps, type ReactNode } from "react";
import clsx from "clsx";

import s from "./NewButton.module.scss";

interface CustomButtonProps extends ComponentProps<"button"> {
  children?: ReactNode;
  color?: "yellow" | "blue";
}

export default function NewButton({
  children,
  className,
  color = "yellow",
  ...otherProps
}: CustomButtonProps) {
  return (
    <button
      {...otherProps}
      className={clsx(
        s.button,
        color === "yellow" ? s.buttonYellow : s.buttonBlue,
        className
      )}
    >
      {children}
    </button>
  );
}
