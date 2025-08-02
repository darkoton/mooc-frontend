import { Trans, useLingui } from "@lingui/react/macro";

import Container from "@shared/ui/Container/Container";
import CourseInfoBadge from "@features/courses/CourseInfoBadge";
import { useTransformDuration, type ICourse } from "@entities/course";
import { useGetPrice } from "./hooks/useGetPrice";

import PixelArtDotsIcon from "@shared/assets/icons/pixelArtDots.svg?react";

import s from "./CourseDetails.module.scss";

export default function CourseDetails({
  isLoading,
  course,
}: {
  isLoading: boolean;
  course: ICourse | null;
}) {
  const { t } = useLingui();
  const transformedDuration = useTransformDuration(course?.duration || 0);

  const getMode = () => {
    if (course?.study_format === "Online") {
      return t`Online`;
    }

    if (course?.study_format === "Offline") {
      return t`Offline`;
    }

    if (course?.study_format === "Hybrid") {
      return t`Hybrid`;
    }
  };

  const price = useGetPrice(course?.price);

  return (
    <section className={s.detailsSection}>
      <Container className={s.detailsContainer}>
        <div>
          <h2 className={s.detailsTitle}>
            <PixelArtDotsIcon />
            <Trans>Details program</Trans>
          </h2>
          <div className={s.infoBadgesContainer}>
            {typeof course?.has_certificate === "boolean" && (
              <CourseInfoBadge
                type="Certificate"
                value={course?.has_certificate ? t`Yes` : t`No`}
                loading={isLoading}
              />
            )}
            {!!course?.duration && (
              <CourseInfoBadge
                type="Duration"
                value={transformedDuration}
                loading={isLoading}
              />
            )}
            {course?.study_format && (
              <CourseInfoBadge
                type="Mode"
                value={getMode()}
                loading={isLoading}
              />
            )}
            <CourseInfoBadge type="Tuition" value={price} loading={isLoading} />
          </div>
        </div>
        <div className={s.detailsRightWrapper}>
          <div className={s.detailsRight}>
            <img
              src={require("./assets/images/detailsDecor.jpg")}
              alt={t`Illustration of online learning and education tools`}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
