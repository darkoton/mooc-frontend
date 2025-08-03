import { Trans } from "@lingui/react/macro";

import DecorIcon from "./assets/images/decor.svg?react";
import DecorYellowIcon from "./assets/images/decor-yellow.svg?react";

import s from "./CourseReview.module.scss";
import { IReview } from "@entities/review";
import clsx from "clsx";
import Rating from "@shared/ui/Rating/Rating";

type CourseReviewProps = {
  isUser?: boolean;
  onEdit?: () => void
} & IReview;

export default function CourseReview({
  isUser = false,
  onEdit,
  ...props
}: CourseReviewProps) {

  return (
    <article className={clsx(s.review, isUser && s.isUser)}>
      <div className={s.left}>
        <header className={s.header}>
          <div className={s.imgWrapper}>
            <img
              src={require("./assets/images/person.jpg")}
              alt={props.username}
            />
          </div>

          <div className={s.userInfo}>
            <h5 className={s.title}>{props.username}</h5>
            <p className={s.subtitle}>
              <Trans>Student</Trans>
            </p>
          </div>
        </header>

        <footer className={s.middle}>
          <div className={s.rating}>
            <Rating edit={false} value={Number(props.rating)} size={22} />
            <span>{props.rating}</span>
          </div>
          <Trans>{props.text}</Trans>
        </footer>
      </div>

      <aside className={s.right}>
        {isUser ? <DecorYellowIcon /> : <DecorIcon />}
      </aside>

      {isUser && (
        <button onClick={onEdit} className={s.editButton}>
          <span>
            <Trans>Edit</Trans>
          </span>
        </button>
      )}
    </article>
  );
}
