import clsx from "clsx";

import s from "./Spinner.module.scss";

type SpinnerProps = {
  variant?: "center" | "top";
};

function Spinner({ variant = "center" }: SpinnerProps) {
  const className = clsx(s.spinner, variant === "center" ? s.center : s.top);

  return <span className={className}></span>;
}

export default Spinner;
