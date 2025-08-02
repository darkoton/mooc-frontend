import clsx from "clsx";
import { type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

import s from "./MenuItem.module.scss";

type CommonProps = {
  component?: "link" | "button";
  children?: ReactNode;
  startIcon?: ReactNode;
  danger?: boolean;
};

type ButtonAndLinkProps =
  | LinkProps
  | React.ButtonHTMLAttributes<HTMLButtonElement>;

type MenuItemProps = CommonProps & ButtonAndLinkProps;

function MenuItem({
  component = "link",
  className,
  children,
  danger,
  startIcon,
  ...otherProps
}: MenuItemProps) {
  const finalClassName = clsx(
    s.menuItem,
    className,
    danger && s.menuItemDanger
  );

  return component === "link" ? (
    <Link
      rel="noopener"
      {...(otherProps as LinkProps)}
      className={finalClassName}
    >
      {startIcon}
      <span>{children}</span>
    </Link>
  ) : (
    <button
      type="button"
      {...(otherProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      className={finalClassName}
    >
      {startIcon}
      <span>{children}</span>
    </button>
  );
}

export default MenuItem;
