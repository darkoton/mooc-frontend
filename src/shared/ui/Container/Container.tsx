import { createElement } from "react";
import clsx from "clsx";
import s from "./Container.module.scss";

interface IContainerProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  component?: string;
}

function Container({
  children,
  className,
  component = "div",
  ...otherProps
}: IContainerProps) {
  return createElement(
    component,
    { className: clsx(s.container, className), ...otherProps },
    children
  );
}

export default Container;
