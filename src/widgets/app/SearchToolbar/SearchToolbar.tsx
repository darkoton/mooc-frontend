import { lazy, Suspense, useState } from "react";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import Input from "@shared/ui/Input";
import Checkbox from "@shared/ui/Checkbox/Checkbox";
import Select from "@shared/ui/Select";
import { routes } from "@app/router/routes";

import ClearIcon from "./assets/icons/clear.svg?react";
import FilterIcon from "@shared/assets/icons/filter.svg?react";

import s from "./SearchToolbar.module.scss";

const SearchFilters = lazy(() => import("@features/app/SearchFilters"));

export default function SearchToolbar() {
  const { t } = useLingui();
  const navigate = useNavigate();

  const [sort, setSort] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <header>
        <section>
          <div className={clsx(s.container, s.searchBar)}>
            <Input
              endAdornment={
                <button className={s.clearBtn}>
                  <ClearIcon />
                </button>
              }
              className={s.input}
            />

            <button className={s.cancel} onClick={() => navigate(routes.HOME)}>
              <Trans>Cancel</Trans>
            </button>
          </div>
        </section>

        <section className={s.filtersAndSort}>
          <div className={s.container}>
            <div className={s.filtersAndSortHeader}>
              <p className={s.resultsCount}>
                <Plural
                  value={120}
                  one="# Result"
                  few="# Results"
                  other="# Results"
                />
              </p>

              <div className={s.filtersAndSortHeaderRight}>
                <Select
                  value={sort}
                  options={[
                    { value: "newest", label: t`Newest` },
                    { value: "most-popular", label: t`Most popular` },
                    { value: "graduate-degrees", label: t`Graduate Degrees` },
                  ]}
                  onChange={({ value }) => setSort(value)}
                  withOverlay
                />
                <button
                  className={s.filterBtn}
                  onClick={() => setShowFilters(true)}
                >
                  <FilterIcon />
                  <Trans>Filters</Trans>
                </button>
              </div>
            </div>

            <div className={clsx(s.quickFilter, s.quickFilter1)}>
              <Checkbox label={t`Online courses`} />
              <span>17</span>
            </div>

            <div className={s.quickFilter}>
              <Checkbox label={t`University courses`} />
              <span>17</span>
            </div>
          </div>
        </section>
      </header>

      {showFilters && (
        <Suspense>
          <SearchFilters onClose={() => setShowFilters(false)} />
        </Suspense>
      )}
    </>
  );
}
