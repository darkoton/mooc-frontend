import { type RefObject, useRef } from "react";
import { Link } from "react-router-dom";
import { Trans } from "@lingui/react/macro";

import { useTransformDuration, type ICourse } from "@entities/course";
import { routes } from "@app/router/routes";
import { useProvidersStore } from "@entities/provider/store/provider";
// import { selectSavedCourse, useSavedCoursesStore } from "@entities/savedCourse";

import ClockIcon from "@shared/assets/icons/clock.svg?react";
import BookmarkIcon from "./assets/icons/bookmark.svg?react";

import s from "./OnlineCourseCard.module.scss";

interface OnlineCourseCardProps {
  course: ICourse;
  onSaveClick?: (data: {
    anchorRef: RefObject<HTMLButtonElement | null>;
    courseId: string;
  }) => void;
}

export default function OnlineCourseCard({
  course: {
    card_logo,
    name,
    provider: providerUuid,
    has_certificate,
    duration,
    uuid,
  },
  onSaveClick,
}: OnlineCourseCardProps) {
  const providers = useProvidersStore((state) => state.providers);
  const provider = providers.find((provider) => provider.uuid === providerUuid);

  const transformedDuration = useTransformDuration(duration);

  // const savedCourse = useSavedCoursesStore(selectSavedCourse(uuid));

  const saveBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <article className={s.card}>
      <header className={s.header}>
        <img src={card_logo} alt={name} />
      </header>

      <div className={s.providerRow}>
        <img src={provider?.logo} alt={provider?.name} />
      </div>

      <h5 className={s.title}>{name}</h5>

      <footer className={s.footer}>
        <div>
          {has_certificate && (
            <span className={s.certificate}>
              <Trans>Certificate</Trans>
            </span>
          )}
          {has_certificate && !!duration && "|"}
          {!!duration && (
            <span className={s.duration}>
              <ClockIcon /> {transformedDuration}
            </span>
          )}
        </div>

        <button
          className={s.saveBtn}
          ref={saveBtnRef}
          onClick={() =>
            onSaveClick?.({ anchorRef: saveBtnRef, courseId: uuid })
          }
        >
          <BookmarkIcon />
        </button>
      </footer>

      <Link to={`${routes.COURSE}/${uuid}`} className={s.link} />
    </article>
  );
}
