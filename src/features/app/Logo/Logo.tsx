import { Link } from "react-router-dom";

import { routes } from "@app/router/routes";

import LogoSvg from "./logo.svg?react";

import s from "./Logo.module.scss";
import clsx from "clsx";

interface LogoProps {
  clickable?: boolean;
  className?: string;
}

export default function Logo({ clickable = true, className }: LogoProps) {
  return clickable ? (
    <div className={clsx(s.wrapper, className)}>
      <Link to={routes.HOME}>
        <LogoSvg />
      </Link>
    </div>
  ) : (
    <div className={clsx(s.wrapper, className)}>
      <LogoSvg />
    </div>
  );
}
