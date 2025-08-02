import { createPortal } from "react-dom";
import clsx from "clsx";
import { useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { usePageScrollLock } from "@shared/hooks/usePageScrollLock";

import s from "./Drawer.module.scss";

interface IDrawerProps {
  open: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

function Drawer({ open, children, onClose, className }: IDrawerProps) {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: onClose,
    trackMouse: true,
  });

  usePageScrollLock(open);

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

  return createPortal(
    <div className={clsx(open && s.drawerOpen)}>
      <div className={s.overlay} onClick={onClose} {...swipeHandlers} />
      <div className={clsx(s.content, className)}>{children}</div>
    </div>,
    (document.getElementById("root") as HTMLElement | null) || document.body
  );
}

export default Drawer;
