import { type ReactNode } from "react";
import clsx from "clsx";

import s from "./IconButton.module.scss";

interface CustomIconButtonProps {
  children?: ReactNode;
}

type IconButtonProps = React.ComponentProps<"button"> & CustomIconButtonProps;

function IconButton({ children, className, ...otherProps }: IconButtonProps) {
  return (
    <button className={clsx(s.iconBtn, className)} {...otherProps}>
      {children}
    </button>
  );
}

export default IconButton;
