import { createPortal } from "react-dom";
import clsx from "clsx";

import s from "./Backdrop.module.scss";

interface BackdropProps {
  open: boolean;
  overlayColor?: "dark" | "light";
}

export default function Backdrop({
  open,
  overlayColor = "light",
}: BackdropProps) {
  return createPortal(
    <>
      <div
        className={clsx(
          s.overlay,
          open && s.overlayVisible,
          overlayColor === "light" ? s.overlayLight : s.overlayDark
        )}
      />
      <div className={s.spinnerWrapper}>
        <span className={s.spinner} />
      </div>
    </>,
    document.body
  );
}
