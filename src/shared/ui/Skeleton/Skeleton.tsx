import { type CSSProperties } from "react";
import clsx from "clsx";

import s from "./Skeleton.module.scss";

interface SkeletonProps {
  variant?: "text" | "circular";
  animation?: "pulse" | "none";
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  className?: string;
}

export default function Skeleton({
  variant = "text",
  animation = "none",
  width,
  height,
  style,
  className,
}: SkeletonProps) {
  return (
    <div
      className={clsx(
        s.skeleton,
        variant === "text" && s.skeletonText,
        variant === "circular" && s.skeletonCircular,
        animation === "pulse" && s.pulseAnim,
        className
      )}
      style={{ ...style, width, height }}
    />
  );
}
