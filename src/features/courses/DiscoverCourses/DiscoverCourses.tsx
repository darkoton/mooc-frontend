import { Plural } from "@lingui/react/macro";

import Container from "@shared/ui/Container/Container";
import type { ICourse } from "@entities/course";
import Skeleton from "@shared/ui/Skeleton";

import PixelArtDotsIcon from "@shared/assets/icons/pixelArtDots.svg?react";
import StarIcon from "@shared/assets/icons/star.svg?react";

import s from "./DiscoverCourses.module.scss";

export default function DiscoverCourses({
  isLoading,
  course,
}: {
  isLoading: boolean;
  course: ICourse | null;
}) {
  return (
    <section className={s.discoverSection}>
      <Container className={s.discoverContainer}>
        <div className={s.discoverLeft}>
          <h2 className={s.discoverTitle}>
            <PixelArtDotsIcon />
            Discover the Courses
          </h2>
          <p className={s.subtitle}>
            The high status of a classical research University is underpinned by
            the numerous academic achievements of its staff. The staff at the
            University have a broad range of formal achievements recognised, in
            particular with the State Prize of Ukraine in Science and
            Technology, Awards from the National Academy of Sciences of Ukraine
            and branches of the national academies of sciences, Orders
          </p>
        </div>
        <div className={s.discoverRight}>
          <div className={s.ratingBox}>
            <p className={s.rating}>
              <StarIcon />{" "}
              {isLoading ? <Skeleton width={63} /> : course?.rating}
            </p>
            <a href="#reviews">
              <Plural
                value={20}
                one="# Review"
                few="# Reviews"
                other="# Reviews"
              />
            </a>
          </div>

          <a href="#" className={s.leaveReviewLink}>
            Add a review
          </a>
        </div>
      </Container>
    </section>
  );
}
