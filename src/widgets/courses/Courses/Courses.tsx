import { useState } from "react";
import { Link } from "react-router-dom";
import { Trans } from "@lingui/react/macro";

import OnlineCourseCard from "@features/courses/OnlineCourseCard";
import Container from "@shared/ui/Container/Container";
import { routes } from "@app/router/routes";
import SelectCategory from "@features/courses/SelectCategory";
import Breadcrumbs from "@shared/ui/Breadcrumbs";
import RedirectSearch from "@features/courses/RedirectSearch";
import Drawer from "@shared/ui/Drawer/Drawer";
import OnlineCourseCardSkeleton from "@features/courses/OnlineCourseCardSkeleton";
import { useCourses } from "./hooks/useCourses";
import { useBreadcrumbs } from "./hooks/useBreadcrumbs";
import { useHardcodedCategories } from "@entities/course/hooks/useHardcodedCategories";

import PixelArtDotsIcon from "@shared/assets/icons/pixelArtDots.svg?react";
import SearchIcon from "@shared/assets/icons/search.svg?react";

import s from "./Courses.module.scss";

export default function Courses() {
  const breadcrumbs = useBreadcrumbs();

  const [showSelectCategory, setShowSelectCategory] = useState(false);

  const { allCourses, coursesByCategories, isLoading, error } = useCourses();

  const hardcodedCategories = useHardcodedCategories();

  return (
    <>
      <main>
        <section className={s.topSection}>
          <Container>
            <Breadcrumbs items={breadcrumbs} className={s.breadcrumbs} />

            <h1 className={s.pageTitle}>
              <PixelArtDotsIcon />
              <Trans>Explore topics</Trans>
            </h1>
            <p className={s.subtitle}>
              <Trans>
                Search 15 000+ no‑cost learning opportunities worldwide
              </Trans>
            </p>

            <RedirectSearch />
          </Container>
        </section>

        <section className={s.mainSection}>
          <Container className={s.container}>
            <aside className={s.aside}>
              <SelectCategory />
            </aside>

            <div className={s.mainContent}>
              <button
                className={s.selectCategoryTabletBtn}
                onClick={() => setShowSelectCategory(true)}
              >
                <SearchIcon /> <Trans>Topics</Trans>
              </button>

              {error ? (
                <p className={s.errText}>
                  <Trans>
                    Unexpected error occured. Please try again later
                  </Trans>
                </p>
              ) : (
                <>
                  <div className={s.row}>
                    <header className={s.header}>
                      <h2 className={s.rowTitle}>
                        <PixelArtDotsIcon /> <Trans>All courses</Trans>
                      </h2>
                      <Link to={routes.COURSES_SEARCH} className={s.seeAllLink}>
                        <Trans>See all</Trans>
                      </Link>
                    </header>

                    <div className={s.cardsRow}>
                      {isLoading ? (
                        <>
                          <OnlineCourseCardSkeleton />
                          <OnlineCourseCardSkeleton />
                          <OnlineCourseCardSkeleton />
                        </>
                      ) : (
                        allCourses.map((course) => (
                          <OnlineCourseCard key={course.uuid} course={course} />
                        ))
                      )}
                    </div>
                  </div>

                  {hardcodedCategories.map(({ name, id }) => (
                    <div className={s.row} key={id}>
                      <header className={s.header}>
                        <h2 className={s.rowTitle}>
                          <PixelArtDotsIcon /> {name}
                        </h2>
                        <Link
                          to={`${routes.CATEGORY_COURSES}/${id}`}
                          className={s.seeAllLink}
                        >
                          <Trans>See all</Trans>
                        </Link>
                      </header>

                      <div className={s.cardsRow}>
                        {isLoading ? (
                          <>
                            <OnlineCourseCardSkeleton />
                            <OnlineCourseCardSkeleton />
                            <OnlineCourseCardSkeleton />
                          </>
                        ) : (
                          coursesByCategories
                            .filter((course) => course.category === id)
                            .map((course) => (
                              <OnlineCourseCard
                                key={course.uuid}
                                course={course}
                              />
                            ))
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </Container>
        </section>
      </main>

      {showSelectCategory && (
        <Drawer
          open
          onClose={() => setShowSelectCategory(false)}
          className={s.selectCategoryDrawer}
        >
          <header>
            <button
              className={s.closeSelectCategoryBtn}
              onClick={() => setShowSelectCategory(false)}
            >
              <Trans>Return</Trans>
            </button>
            <SelectCategory />
          </header>
        </Drawer>
      )}
    </>
  );
}
