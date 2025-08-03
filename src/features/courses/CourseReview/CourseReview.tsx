import { Trans } from "@lingui/react/macro";

import DecorIcon from "./assets/images/decor.svg?react";

import s from "./CourseReview.module.scss";
import { IReview } from "@entities/review";

export default function CourseReview(props: IReview) {
  return (
    <article className={s.review}>
      <div className={s.left}>
        <header className={s.header}>
          <div className={s.imgWrapper}>
            <img
              src={require("./assets/images/person.jpg")}
              alt={props.username}
            />
          </div>

          <div>
            <h5 className={s.title}>{props.username}</h5>
            <p className={s.subtitle}>
              <Trans>Student</Trans>
            </p>
          </div>
        </header>

        <footer className={s.middle}>
          <Trans>
            {props.text}
          </Trans>
        </footer>
      </div>

      <aside className={s.right}>
        <DecorIcon />
      </aside>
    </article>
  );
}
