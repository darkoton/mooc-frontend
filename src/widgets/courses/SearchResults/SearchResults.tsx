import { Trans } from "@lingui/react/macro";

import PixelArtDotsIcon from "@shared/assets/icons/pixelArtDots.svg?react";
import CourseCardSmall from "@features/courses/CardSmall";

import s from "./SearchResults.module.scss";

export default function CoursesSearchResults() {
  return (
    <section>
      <div className={s.container}>
        <h2 className={s.title}>
          <PixelArtDotsIcon /> <Trans>Online courses</Trans>
        </h2>

        <ul className={s.list}>
          {Array.from(Array(8)).map((_, i) => (
            <li>
              <CourseCardSmall key={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
