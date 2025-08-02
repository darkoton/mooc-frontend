import { Link } from "react-router-dom";
import { Trans } from "@lingui/react/macro";

import { useFormattedSalary } from "../../hooks/useFormattedSalary";
import { routes } from "@app/router/routes";

import UkraineIcon from "../../assets/icons/ukraine.svg?react";
import SwitzerlandIcon from "../../assets/icons/switzerland.svg?react";
import UsaIcon from "../../assets/icons/usa.svg?react";
import DotsArrow from "../../assets/icons/dotsArrow.svg?react";

import s from "./CareerCard.module.scss";

interface CareerCardProps {
  img: string;
  title: string;
  avgSalary: {
    ua: number;
    ch: number;
    us: number;
  };
}

export default function CareerCard({ img, title, avgSalary }: CareerCardProps) {
  const { uk, ch, us } = useFormattedSalary(avgSalary);

  return (
    <article className={s.article}>
      <header className={s.header}>
        <img src={img} alt={title} />
      </header>
      <h5 className={s.title}>{title}</h5>

      <div className={s.avgSalaryTitle}>
        <Trans>Average salary</Trans>
      </div>
      <div className={s.avgSalariesContainer}>
        <div className={s.avgSalaryBox}>
          <UkraineIcon /> {uk}
        </div>
        <div className={s.avgSalaryBox}>
          <SwitzerlandIcon /> {ch}
        </div>
        <div className={s.avgSalaryBox}>
          <UsaIcon /> {us}
        </div>
      </div>

      <Link to={`${routes.CAREER}/1`} className={s.link}>
        <Trans>Learn more</Trans>
        <DotsArrow />
      </Link>
    </article>
  );
}
