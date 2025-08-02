import { useState } from "react";
import { useParams } from "react-router-dom";
import { Trans, useLingui } from "@lingui/react/macro";

import Footer from "@widgets/app/Footer";
import Header from "@widgets/app/Header";
import PageTopSection from "@widgets/app/PageTopSection";
import { routes } from "@app/router/routes";
import Container from "@shared/ui/Container/Container";
import Select from "@shared/ui/Select";
import CareerCard from "./ui/CareerCard/CareerCard";
import Pagination from "@shared/ui/Pagination/Pagination";
import useWindowDimensions from "@shared/hooks/useWindowDimensions";
import { categoryCareers } from "./utils/categoryCareers";
import CareerCardSkeleton from "./ui/CareerCardSkeleton/CareerCardSkeleton";
import { useCategoryCareers } from "./hooks/useCategoryCareers";

import s from "./CategoryCareers.module.scss";

export default function CategoryCareersPage() {
  const { id } = useParams();

  const { t } = useLingui();

  const { sm } = useWindowDimensions();

  const [sort, setSort] = useState("newest");

  const { isLoading, error } = useCategoryCareers();

  const getGridElement = () => {
    if (error) {
      return (
        <p className={s.errText}>
          <Trans>Unexpected error occured. Please try again later</Trans>
        </p>
      );
    }

    if (isLoading) {
      return (
        <div className={s.grid}>
          {Array.from(Array(12)).map((_, i) => (
            <CareerCardSkeleton key={i} />
          ))}
        </div>
      );
    }

    return (
      <div className={s.grid}>
        {categoryCareers.map((categoryCareersItem, i) => (
          <CareerCard {...categoryCareersItem} key={i} />
        ))}
      </div>
    );
  };

  return (
    <div className={s.pageWrapper}>
      <Header />
      <main>
        <PageTopSection
          title={"Information technology"}
          subtitle="The IT industry is a dynamic and entrepreneurial working environment that has had a revolutionary impact on the global economy and society over the past few decades. "
          breadcrumbs={[
            {
              label: t`Home`,
              href: routes.HOME,
            },
            {
              label: t`Category career`,
              href: `${routes.CATEGORY_CAREERS}/${id}`,
            },
          ]}
          onSearch={() => {}}
          className={s.topSection}
        />
        <section className={s.mainSection}>
          <Container>
            {!error && (
              <div className={s.mainSectionTopRow}>
                <div className={s.sortWrapper}>
                  <Trans>Sort by:</Trans>
                  <Select
                    value={sort}
                    options={[
                      { value: "newest", label: t`Newest` },
                      { value: "popular", label: t`Most popular` },
                    ]}
                    onChange={({ value }) => setSort(value)}
                  />
                </div>

                <div className={s.resultsCount}>645 results</div>
              </div>
            )}

            {getGridElement()}

            {!error && (
              <Pagination
                forcePage={0}
                pageCount={10}
                // onPageChange={({ selected }) => {
                //   searchParams.set("page", `${selected}`);
                //   setSearchParams(searchParams.toString());
                //   window.scrollTo(0, 0);
                // }}
                containerClassName={s.pagination}
                pageRangeDisplayed={sm ? 1 : 2}
                marginPagesDisplayed={1}
              />
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
