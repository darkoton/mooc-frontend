import { Trans } from "@lingui/react/macro";

import UniversityCourseCardSmall from "@features/universityPrograms/CardSmall";

import PixelArtDotsIcon from "@shared/assets/icons/pixelArtDots.svg?react";

import s from "./SearchResults.module.scss";

export default function UniversityProgramsSearchResults() {
  return (
    <section className={s.section}>
      <div className={s.container}>
        <h2 className={s.title}>
          <PixelArtDotsIcon /> <Trans>Univesity courses</Trans>
        </h2>

        <ul className={s.list}>
          {Array.from(Array(8)).map((_, i) => (
            <li>
              <UniversityCourseCardSmall key={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
