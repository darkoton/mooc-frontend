import { createElement, type HTMLProps, type JSX } from "react";

import { useAspectRatio } from "@shared/hooks/useAspectRatio";

interface Props extends HTMLProps<HTMLElement> {
  aspectRatio: string;
  component?: keyof JSX.IntrinsicElements;
}

export const AspectRatioBox = ({
  aspectRatio,
  children,
  component = "div",
  ...otherProps
}: Props) => {
  const ref = useAspectRatio(aspectRatio);

  return createElement(
    component,
    {
      ...otherProps,
      ref,
    },
    children
  );
};
