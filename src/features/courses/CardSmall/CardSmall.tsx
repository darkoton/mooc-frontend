import { Link } from "react-router-dom";

import { routes } from "@app/router/routes";

import ClockIcon from "@shared/assets/icons/clock.svg?react";
import StarIcon from "@shared/assets/icons/star.svg?react";
import CourseraLogo from "./assets/logos/coursera.svg?react";

import s from "./CardSmall.module.scss";

export default function CourseCardSmall() {
  return (
    <article className={s.card}>
      <img
        src={require("./assets/images/course.png")}
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

        <div className={s.middleRow}>
          <CourseraLogo />

          <span>+95425 apprentices</span>
        </div>

        <div className={s.bottomRow}>
          <span>Professional certificate</span>

          <span>|</span>

          <span className={s.duration}>
            <ClockIcon /> 4h50m
          </span>
        </div>
      </div>

      <Link to={`${routes.COURSE}/123`} className={s.link} />
    </article>
  );
}
