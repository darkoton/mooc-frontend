import { Link } from "react-router-dom";

import ClockIcon from "./assets/icons/clock.svg?react";
import StarIcon from "@shared/assets/icons/star.svg?react";

import s from "./CardSmall.module.scss";

export default function UniversityProgramCardSmall() {
  return (
    <article className={s.card}>
      <img
        src={require("./assets/images/university.png")}
        alt="Kyiv University"
        className={s.cardImg}
      />

      <div className={s.cardBody}>
        <h5 className={s.cardTitle}>Front end web development</h5>

        <div className={s.subtitleRow}>
          <div className={s.rating}>
            <StarIcon /> 4,5
          </div>

          <Link to="#" className={s.reviewsLink}>
            (1k reviews)
          </Link>
        </div>

        <div className={s.bottomRow}>
          <span>Kyiv University</span>

          <span className={s.duration}>
            <ClockIcon /> 4h50m
          </span>
        </div>
      </div>

      <Link to={"#"} className={s.link} />
    </article>
  );
}
