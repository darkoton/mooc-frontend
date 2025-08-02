import { useParams } from "react-router-dom";
import { Plural, Trans, useLingui } from "@lingui/react/macro";

import Breadcrumbs from "@shared/ui/Breadcrumbs";
import Container from "@shared/ui/Container/Container";
import Button from "@shared/ui/NewButton";
import { routes } from "@app/router/routes";
import CourseInfoBadge from "@features/courses/CourseInfoBadge";
import { useTransformDuration, type ICourse } from "@entities/course";
import { useProvidersStore } from "@entities/provider/store/provider";
import Skeleton from "@shared/ui/Skeleton";
import { useTranslatedLanguage } from "./hooks/useTranslatedLanguage";
import { useGetPrice } from "./hooks/useGetPrice";
import { loanSiteUrl } from "@shared/config/envVars";

import PixelArtDotsIcon from "@shared/assets/icons/pixelArtDots.svg?react";
import StarIcon from "@shared/assets/icons/star.svg?react";
import ArrowRightIcon from "./assets/icons/arrowRight.svg?react";

import s from "./CourseTopSection.module.scss";

export default function CourseTopSection({
  isLoading,
  course,
}: {
  isLoading: boolean;
  course: ICourse | null;
}) {
  const { uuid } = useParams();
  const { t } = useLingui();

  const links = [
    {
      href: "/",
      label: t`Homepage`,
    },
    {
      href: `${routes.COURSE}/${uuid}`,
      label: t`course`,
    },
  ];

  const providers = useProvidersStore((state) => state.providers);
  const provider = providers.find(
    (provider) => provider.uuid === course?.provider
  );

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

  const language = useTranslatedLanguage(course?.language);
  const price = useGetPrice(course?.price);

  return (
    <section>
      <div className={s.container}>
        <div className={s.left}>
          <div className={s.leftInner}>
            <img src={course?.page_logo} alt={course?.name} />
          </div>
        </div>

        <div className={s.right}>
          <Container className={s.rightInner}>
            <Breadcrumbs items={links} className={s.breadcrumbs} />
            <div className={s.providerWrapper}>
              <img src={provider?.logo} alt={provider?.name} />
            </div>
            <PixelArtDotsIcon className={s.pixelArtDotsIcon} />

            <h1 className={s.title}>
              {isLoading ? (
                <>
                  <Skeleton style={{ marginBottom: 3 }} />
                  <Skeleton width={"30%"} />
                </>
              ) : (
                course?.name
              )}
            </h1>

            <p className={s.subtitleRow}>
              {isLoading ? (
                <Skeleton width={"20%"} />
              ) : (
                <>
                  <StarIcon /> {course?.rating}{" "}
                  <a href="#reviews">
                    <Plural
                      value={20}
                      one="# Review"
                      few="# Reviews"
                      other="# Reviews"
                    />
                  </a>
                </>
              )}
            </p>
            <p className={s.languagesRow}>
              {isLoading ? (
                <Skeleton width={"25%"} />
              ) : (
                <span>
                  <Trans>Course language</Trans>: {language}
                </span>
              )}
            </p>

            <div className={s.infoRow}>
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
              <CourseInfoBadge
                type="Tuition"
                value={price}
                loading={isLoading}
              />
            </div>

            {course?.price && +course.price !== 0 && (
              <Button
                className={s.btn}
                onClick={() =>
                  window.open(loanSiteUrl, "_blank", "noopener,noreferrer")
                }
              >
                <Trans>Get financing</Trans> <ArrowRightIcon />
              </Button>
            )}
          </Container>
        </div>
      </div>
    </section>
  );
}
