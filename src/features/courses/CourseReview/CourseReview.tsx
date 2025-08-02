import { Trans } from "@lingui/react/macro";

import DecorIcon from "./assets/images/decor.svg?react";

import s from "./CourseReview.module.scss";

export default function CourseReview() {
  return (
    <article className={s.review}>
      <div className={s.left}>
        <header className={s.header}>
          <div className={s.imgWrapper}>
            <img
              src={require("./assets/images/person.jpg")}
              alt="Nathan Clark"
            />
          </div>

          <div>
            <h5 className={s.title}>Nathan Clark</h5>
            <p className={s.subtitle}>
              <Trans>Student</Trans>
            </p>
          </div>
        </header>

        <footer className={s.middle}>
          <Trans>
            “Drewl has done so much work with Headless platforms, and we knew
            the Drewl team was incredibly well-versed in that space.”
          </Trans>
        </footer>
      </div>

      <aside className={s.right}>
        <DecorIcon />
      </aside>
    </article>
  );
}
