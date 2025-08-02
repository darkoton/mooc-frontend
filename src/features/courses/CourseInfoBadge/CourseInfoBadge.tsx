import { type ReactNode } from "react";
import { useLingui } from "@lingui/react/macro";

import Skeleton from "@shared/ui/Skeleton";

import GraduationCapIcon from "./assets/icons/graduationCap.svg?react";

import s from "./CourseInfoBadge.module.scss";

interface CourseInfoBadgeProps {
  type: "Certificate" | "Mode" | "Duration" | "Tuition";
  value: ReactNode;
  loading?: boolean;
}

export default function CourseInfoBadge({
  type,
  value,
  loading,
}: CourseInfoBadgeProps) {
  const { t } = useLingui();

  const typeTitleMappings = {
    Certificate: t`Certificate`,
    Mode: t`Mode`,
    Duration: t`Duration`,
    Tuition: t`Tuition`,
  };

  const typeImgMappings = {
    Mode: require("./assets/icons/campus.png"),
    Duration: require("./assets/icons/hourglass.png"),
    Tuition: require("./assets/icons/money.png"),
  };

  return (
    <div className={s.info}>
      {type === "Certificate" ? (
        <GraduationCapIcon />
      ) : (
        <img src={typeImgMappings[type]} alt={type} />
      )}
      <p>{typeTitleMappings[type]}</p>
      <p>{loading ? <Skeleton /> : value}</p>
    </div>
  );
}
