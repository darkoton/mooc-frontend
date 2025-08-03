import { lazy, Suspense, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import { Plural, Trans } from "@lingui/react/macro";

import CourseReview from "@features/courses/CourseReview";
import StarIcon from "@shared/assets/icons/star.svg?react";
import Container from "@shared/ui/Container/Container";
import useWindowDimensions from "@shared/hooks/useWindowDimensions";
import Backdrop from "@shared/ui/Backdrop/Backdrop";
import { useAuthStore } from "@entities/auth";
import { useParams } from "react-router-dom";

import PixelArtDotsIcon from "@shared/assets/icons/pixelArtDots.svg?react";

import s from "./CourseReviews.module.scss";
import { useReviews } from "./hooks/useReviews";
import { useRating } from "./hooks/useRating";
import { useUserStore } from "@entities/user";
import { IReview } from "@entities/review";

const LoginModal = lazy(() => import("./LoginModal/LoginModal"));
const ReviewModal = lazy(() => import("./ReviewModal/ReviewModal"));

export default function CourseReviews() {
  const { sm } = useWindowDimensions();
  const { uuid } = useParams();
  const { user } = useUserStore();

  const [currentSlide, setCurrentSlide] = useState(0);

  const { auth } = useAuthStore();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { reviews } = useReviews(uuid);
  const { rating } = useRating(reviews);

  const [modalReviewData, setModalReviewData] = useState<IReview | null>(null);
  const [modalReviewMode, setModalReviewMode] = useState<"create" | "edit">(
    "create"
  );

  function handleClickEdit(review: IReview) {
    setModalReviewMode("edit");
    setShowReviewModal(true);
    setModalReviewData(review);
  }

  const userReviews = useMemo(() => {
    return reviews.filter(
      (review) => review.username === `${user?.first_name} ${user?.last_name}`
    );
  }, [reviews, user?.first_name, user?.last_name]);

  const notUserReviews = useMemo(() => {
    return reviews.filter(
      (review) => review.username !== `${user?.first_name} ${user?.last_name}`
    );
  }, [reviews, user?.first_name, user?.last_name]);

  return (
    <>
      <section className={s.section}>
        <Container>
          <h2 className={s.title}>
            <PixelArtDotsIcon /> <Trans>Student Stories</Trans>
          </h2>

          <div className={s.mainContent}>
            {reviews.length > 0 ? (
              <div className={s.left}>
                {userReviews.length > 0 && (
                  <>
                    <h3 className={s.myReview}>My review</h3>

                    {sm ? (
                      <Swiper
                        className={s.slider}
                        spaceBetween={16}
                        slidesPerView={1}
                        onSlideChange={(swiper) =>
                          setCurrentSlide(swiper.activeIndex)
                        }
                      >
                        {userReviews.map((review, i) => (
                          <SwiperSlide key={i}>
                            <CourseReview
                              onEdit={() =>
                                auth
                                  ? handleClickEdit(review)
                                  : setShowAuthModal(true)
                              }
                              isUser={true}
                              {...review}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      userReviews.map((review, i) => (
                        <CourseReview
                          onEdit={() =>
                            auth
                              ? handleClickEdit(review)
                              : setShowAuthModal(true)
                          }
                          isUser={true}
                          key={i}
                          {...review}
                        />
                      ))
                    )}

                    <div className={s.line}></div>
                  </>
                )}

                {sm ? (
                  <Swiper
                    className={s.slider}
                    spaceBetween={16}
                    slidesPerView={1}
                    onSlideChange={(swiper) =>
                      setCurrentSlide(swiper.activeIndex)
                    }
                  >
                    {notUserReviews.map((review, i) => (
                      <SwiperSlide key={i}>
                        <CourseReview {...review} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  notUserReviews.map((review, i) => (
                    <CourseReview key={i} {...review} />
                  ))
                )}

                <div className={s.pagination}>
                  {notUserReviews.map((_, index) => {
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
            ) : (
              <div className={s.empty}>
                <Trans>Empty</Trans>
              </div>
            )}

            <aside className={s.right}>
              <div className={s.rightTop}>
                <h3 className={s.rating}>
                  <StarIcon /> {rating}
                </h3>
                <a href="#" className={s.reviewsLink}>
                  <Plural
                    value={reviews.length}
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
          <ReviewModal
            mode={modalReviewMode}
            review={modalReviewData}
            logo="#"
            onClose={() => setShowReviewModal(false)}
          />
        )}
      </Suspense>
    </>
  );
}
