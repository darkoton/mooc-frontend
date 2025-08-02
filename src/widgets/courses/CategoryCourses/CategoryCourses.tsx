import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Trans } from "@lingui/react/macro";

import OnlineCourseCard from "@features/courses/OnlineCourseCard";
import Container from "@shared/ui/Container/Container";
import { routes } from "@app/router/routes";
import SelectCategory from "@features/courses/SelectCategory";
import Breadcrumbs from "@shared/ui/Breadcrumbs";
import RedirectSearch from "@features/courses/RedirectSearch";
import Drawer from "@shared/ui/Drawer/Drawer";
import OnlineCourseCardSkeleton from "@features/courses/OnlineCourseCardSkeleton";
import { useFetchData } from "./hooks/useFetchData";
import { useCloseCategories } from "./hooks/useCloseCategories";
import { useHardcodedCategories } from "@entities/course/hooks/useHardcodedCategories";
import { useBreadcrumbs } from "../Courses/hooks/useBreadcrumbs";

import PixelArtDotsIcon from "@shared/assets/icons/pixelArtDots.svg?react";
import SearchIcon from "@shared/assets/icons/search.svg?react";

import s from "./CategoryCourses.module.scss";

export default function CategoryCourses() {
  const breadcrumbs = useBreadcrumbs();

  const [showSelectCategory, setShowSelectCategory] = useState(false);

  const hardcodedCategories = useHardcodedCategories();
  const { category } = useParams();
  const subCategories = hardcodedCategories.find(
    ({ id }) => `${id}` === category
  )?.subCategories;
  const navigate = useNavigate();

  useCloseCategories(category, setShowSelectCategory);

  const { courses, isLoading, error } = useFetchData(subCategories);

  if (!category || !subCategories) {
    navigate(routes.COURSES);
    return null;
  }

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
                subCategories.map(({ name, id }) => (
                  <div className={s.row} key={id}>
                    <header className={s.header}>
                      <h2 className={s.rowTitle}>
                        <PixelArtDotsIcon /> {name}
                      </h2>
                      <Link
                        to={`${routes.COURSES_SEARCH}/${category}/${id}`}
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
                        courses
                          .filter((course) => course.subcategory === id)
                          .map((course) => (
                            <OnlineCourseCard
                              key={course.uuid}
                              course={course}
                            />
                          ))
                      )}
                    </div>
                  </div>
                ))
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
