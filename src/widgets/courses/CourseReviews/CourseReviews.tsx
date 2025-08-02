import { lazy, Suspense, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import { Plural, Trans } from "@lingui/react/macro";

import CourseReview from "@features/courses/CourseReview";
import StarIcon from "@shared/assets/icons/star.svg?react";
import Container from "@shared/ui/Container/Container";
import useWindowDimensions from "@shared/hooks/useWindowDimensions";
import Backdrop from "@shared/ui/Backdrop/Backdrop";
import { useAuthStore } from "@entities/auth";

import PixelArtDotsIcon from "@shared/assets/icons/pixelArtDots.svg?react";

import s from "./CourseReviews.module.scss";

const LoginModal = lazy(() => import("@features/auth/LoginModal/LoginModal"));
const ReviewModal = lazy(() => import("./ReviewModal/ReviewModal"));

export default function CourseReviews() {
  const { sm } = useWindowDimensions();

  const [currentSlide, setCurrentSlide] = useState(0);

  const auth = useAuthStore();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <>
      <section className={s.section}>
        <Container>
          <h2 className={s.title}>
            <PixelArtDotsIcon /> <Trans>Student Stories</Trans>
          </h2>

          <div className={s.mainContent}>
            <div className={s.left}>
              {sm ? (
                <Swiper
                  spaceBetween={16}
                  slidesPerView={1}
                  onSlideChange={(swiper) =>
                    setCurrentSlide(swiper.activeIndex)
                  }
                >
                  {Array.from(Array(4)).map((_, i) => (
                    <SwiperSlide key={i}>
                      <CourseReview />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                Array.from(Array(4)).map((_, i) => <CourseReview key={i} />)
              )}

              <div className={s.pagination}>
                {Array.from(Array(4)).map((_, index) => {
                  return (
                    <div
                      key={index}
                      className={clsx(
                        s.paginationMark,
                        currentSlide === index && s.active
                      )}
                    ></div>
                  );
                })}
              </div>
            </div>

            <aside className={s.right}>
              <div className={s.rightTop}>
                <h3 className={s.rating}>
                  <StarIcon /> 4,5
                </h3>
                <a href="#" className={s.reviewsLink}>
                  <Plural
                    value={1000}
                    one="# Review"
                    few="# Reviews"
                    other="# Reviews"
                  />
                </a>
              </div>
              <button
                className={s.addReviewBtn}
                onClick={() =>
                  auth ? setShowReviewModal(true) : setShowAuthModal(true)
                }
              >
                <Trans>Add a review</Trans>
              </button>
            </aside>
          </div>
        </Container>
      </section>
      <Suspense fallback={<Backdrop open />}>
        {showAuthModal && (
          <LoginModal onClose={() => setShowAuthModal(false)} />
        )}
      </Suspense>
      <Suspense fallback={<Backdrop open />}>
        {showReviewModal && (
          <ReviewModal onClose={() => setShowReviewModal(false)} />
        )}
      </Suspense>
    </>
  );
}
