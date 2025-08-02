import { useLocation, useNavigate, useParams } from "react-router-dom";

import Footer from "@widgets/app/Footer";
import Header from "@widgets/app/Header";
import CourseTopSection from "@widgets/courses/CourseTopSection";
import Container from "@shared/ui/Container/Container";
import Tabs from "@shared/ui/Tabs";
import AboutCourse from "@widgets/courses/AboutCourse";
import CourseReviews from "@widgets/courses/CourseReviews";
import { routes } from "@app/router/routes";
import { useCourse } from "./hooks/useCourse";
import { Trans, useLingui } from "@lingui/react/macro";

import s from "./Course.module.scss";
import "../../../../node_modules/swiper/swiper.css";

export default function CoursePage() {
  const { uuid } = useParams();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const { t } = useLingui();

  const { course, isLoading, error } = useCourse(uuid);

  if (!uuid) {
    navigate(routes.COURSES);
    return null;
  }

  const tabs = [
    {
      value: "#about",
      label: t`About`,
    },
    {
      value: "#reviews",
      label: t`Reviews`,
    },
  ];

  return (
    <div className={s.pageWrapper}>
      <Header />
      {error ? (
        <main>
          <Container>
            <p className={s.errText}>
              <Trans>Unexpected error occured. Please try again later</Trans>
            </p>
          </Container>
        </main>
      ) : (
        <main>
          <CourseTopSection isLoading={isLoading} course={course} />

          <section className={s.tabsSection}>
            <Container>
              <Tabs
                value={hash || "#about"}
                onChange={(newTab) => {
                  navigate(`${routes.COURSE}/${uuid}${newTab}`);
                }}
                items={tabs}
              />
            </Container>
          </section>

          {(hash === "#about" || !hash) && (
            <AboutCourse isLoading={isLoading} course={course} />
          )}
          {hash === "#reviews" && <CourseReviews />}
        </main>
      )}
      <Footer />
    </div>
  );
}
