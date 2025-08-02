import { type RefObject, Suspense, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Plural, Trans, useLingui } from "@lingui/react/macro";

import { routes } from "@app/router/routes";

import Footer from "@widgets/app/Footer";
import Header from "@widgets/app/Header";
import PageTopSection from "@widgets/app/PageTopSection";

import SelectCategory from "@features/courses/SelectCategory";
import CoursesFilters from "@features/courses/CoursesFilters";
import OnlineCourseCardSkeleton from "@features/courses/OnlineCourseCardSkeleton";
import OnlineCourseCard from "@features/courses/OnlineCourseCard";
import SaveCoursePopover from "@features/courses/SaveCoursePopover";

import Container from "@shared/ui/Container/Container";
import Select from "@shared/ui/Select";
import Pagination from "@shared/ui/Pagination/Pagination";
import Drawer from "@shared/ui/Drawer/Drawer";

import { useCourses } from "./hooks/useCourses";
import { useCloseCategories } from "./hooks/useCloseCategories";

import SearchIcon from "@shared/assets/icons/search.svg?react";

import s from "./Search.module.scss";

type ISaveCoursePopover =
  | {
      open: true;
      courseId: string;
      saveId?: number;
      anchorRef: RefObject<HTMLButtonElement | null>;
    }
  | {
      open: false;
      courseId: string;
      saveId?: number;
      anchorRef: RefObject<HTMLButtonElement | null> | null;
    };

export default function CoursesSearchPage() {
  const { t } = useLingui();

  const breadcrumbs = [
    {
      href: routes.HOME,
      label: t`Homepage`,
    },
    {
      href: routes.COURSES_SEARCH,
      label: t`All courses`,
    },
  ];

  const { subCategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [showSelectCategory, setShowSelectCategory] = useState(false);

  const { courses, error, isLoading, page } = useCourses();

  useCloseCategories(subCategory, setShowSelectCategory);

  const pageCount = Math.ceil(courses.count / 12);

  const [saveCoursePopover, setSaveCoursePopover] =
    useState<ISaveCoursePopover>({
      open: false,
      courseId: "",
      anchorRef: null,
    });

  const closeSaveCoursePopover = () => {
    setSaveCoursePopover({
      anchorRef: null,
      courseId: "",
      open: false,
      saveId: undefined,
    });
  };

  return (
    <>
      <div className={s.pageWrapper}>
        <Header />
        <main>
          <main>
            <PageTopSection
              breadcrumbs={breadcrumbs}
              title={t`Search`}
              subtitle={t`Search 15 000+ no‑cost learning opportunities worldwide`}
              onSearch={(search) => {
                const value = search.trim();
                if (value) {
                  searchParams.set("q", value);
                } else {
                  searchParams.delete("q");
                }

                searchParams.delete("page");
                setSearchParams(searchParams.toString());
              }}
              className={s.topSection}
            />

            <section className={s.mainSection}>
              <Container className={s.container}>
                <aside className={s.aside}>
                  <SelectCategory />
                  <CoursesFilters />
                </aside>

                <div className={s.mainContent}>
                  <button
                    className={s.selectCategoryTabletBtn}
                    onClick={() => setShowSelectCategory(true)}
                  >
                    <SearchIcon /> <Trans>Filter</Trans>
                  </button>

                  <div className={s.mainContentTopRow}>
                    <div className={s.selectWrapper}>
                      <Trans>Sort by:</Trans>
                      <Select
                        value={searchParams.get("ordering") || "-rating"}
                        options={[
                          { value: "-rating", label: t`Most popular` },
                          { value: "-created_at", label: t`Newest` },
                        ]}
                        onChange={({ value }) => {
                          searchParams.set("ordering", value);
                          setSearchParams(searchParams.toString());
                        }}
                        headClassName={s.selectHead}
                      />
                    </div>
                    <p className={s.resultsCount}>
                      <Plural
                        value={courses.count}
                        one="# result"
                        few="# results"
                        other="# results"
                      />
                    </p>
                  </div>

                  {error ? (
                    <p className={s.errText}>
                      <Trans>
                        Unexpected error occured. Please try again later
                      </Trans>
                    </p>
                  ) : !courses.results.length && !isLoading ? (
                    <p>
                      <Trans>No search results</Trans>
                    </p>
                  ) : (
                    <div className={s.grid}>
                      {isLoading
                        ? Array.from(Array(12)).map((_, i) => (
                            <OnlineCourseCardSkeleton key={i} />
                          ))
                        : courses.results.map((course) => (
                            <OnlineCourseCard
                              key={course.uuid}
                              course={course}
                              onSaveClick={({ anchorRef, courseId }) =>
                                setSaveCoursePopover({
                                  open: true,
                                  courseId,
                                  anchorRef,
                                })
                              }
                            />
                          ))}
                    </div>
                  )}

                  {!error && pageCount > 1 && (
                    <Pagination
                      forcePage={page}
                      pageCount={pageCount}
                      onPageChange={({ selected }) => {
                        searchParams.set("page", `${selected}`);
                        setSearchParams(searchParams.toString());
                        window.scrollTo(0, 0);
                      }}
                      containerClassName={s.pagination}
                    />
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
                <CoursesFilters />
              </header>
            </Drawer>
          )}
        </main>
        <Footer />
      </div>
      <Suspense>
        {saveCoursePopover.open && (
          <SaveCoursePopover
            anchorElRef={saveCoursePopover.anchorRef}
            courseId={saveCoursePopover.courseId}
            onClose={closeSaveCoursePopover}
          />
        )}
      </Suspense>
    </>
  );
}
