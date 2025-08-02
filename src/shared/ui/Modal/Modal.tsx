import {
  type MouseEventHandler,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

import { usePageScrollLock } from "@shared/hooks/usePageScrollLock";

import s from "./Modal.module.scss";

interface IModalProps {
  open: boolean;
  children?: ReactNode;
  onClose?: () => void;
  className?: string;
}

function Modal({ open, children, onClose, className }: IModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

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

  const onClick: MouseEventHandler = (e) => {
    if (e.target === overlayRef.current) {
      onClose?.();
    }
  };

  return createPortal(
    <div
      className={clsx(s.overlay, open && s.overlayVisible, className)}
      onClick={onClick}
      ref={overlayRef}
    >
      {children}
    </div>,
    document.body
  );
}

export default Modal;
