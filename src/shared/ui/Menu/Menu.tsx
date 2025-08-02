import React, { HTMLProps, useEffect, useRef } from "react";
import clsx from "clsx";

import { usePageScrollLock } from "@shared/hooks/usePageScrollLock";
import { usePosition } from "./hooks/usePosition";

import s from "./Menu.module.scss";

interface IMenuProps extends HTMLProps<HTMLDivElement> {
  open: boolean;
  anchorElRef: React.RefObject<HTMLElement | null>;
  children?: React.ReactNode;
  onClose?: () => void;
  position?: "top" | "bottom";
}

function Menu({
  open,
  children,
  className,
  onClose,
  anchorElRef,
  position = "bottom",
  ...otherProps
}: IMenuProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        anchorElRef?.current?.contains(e.target as Node) ||
        wrapperRef.current?.contains(e.target as Node) ||
        !onClose
      ) {
        return;
      }

      onClose();
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [anchorElRef, wrapperRef, onClose]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  usePageScrollLock(open);

  usePosition(anchorElRef, wrapperRef, position);

  return (
    <div
      className={clsx(s.menu, open && s.menuOpen, className)}
      {...otherProps}
      ref={wrapperRef}
    >
      {children}
    </div>
  );
}

export default Menu;
