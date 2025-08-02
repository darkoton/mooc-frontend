import { createPortal } from "react-dom";
import { Trans, useLingui } from "@lingui/react/macro";

import { usePageScrollLock } from "@shared/hooks/usePageScrollLock";
import Checkbox from "@shared/ui/Checkbox/Checkbox";
import Button from "@shared/ui/NewButton";

import s from "./SearchFilters.module.scss";

interface SearchFiltersProps {
  onClose: () => void;
}

export default function SearchFilters({ onClose }: SearchFiltersProps) {
  const { t } = useLingui();

  usePageScrollLock();

  return createPortal(
    <div className={s.wrapper}>
      <header className={s.header}>
        <h2 className={s.title}>
          <Trans>Filters</Trans>
        </h2>
        <button onClick={onClose} className={s.cancelBtn}>
          <Trans>Cancel</Trans>
        </button>
      </header>

      <div className={s.main}>
        <div className={s.filter}>
          <p className={s.filterName}>
            <Trans>Country</Trans>
          </p>
          <div className={s.filterOption}>
            <Checkbox label={t`Ukraine`} />
            <span>17</span>
          </div>
          <div className={s.filterOption}>
            <Checkbox label={t`International`} />
            <span>2</span>
          </div>
        </div>

        <div className={s.filter}>
          <p className={s.filterName}>
            <Trans>University</Trans>
          </p>
          <div className={s.filterOption}>
            <Checkbox label={"University 1"} />
            <span>17</span>
          </div>
          <div className={s.filterOption}>
            <Checkbox label={"University 2"} />
            <span>2</span>
          </div>
        </div>

        <div className={s.filter}>
          <p className={s.filterName}>
            <Trans>Degree type</Trans>
          </p>
          <div className={s.filterOption}>
            <Checkbox label={t`Non-Degree Programs`} />
            <span>17</span>
          </div>
          <div className={s.filterOption}>
            <Checkbox label={t`Undergraduate Degrees`} />
            <span>2</span>
          </div>
          <div className={s.filterOption}>
            <Checkbox label={t`Graduate Degrees`} />
            <span>2</span>
          </div>
          <div className={s.filterOption}>
            <Checkbox label={t`Doctoral Degrees`} />
            <span>2</span>
          </div>
        </div>

        <div className={s.filter}>
          <p className={s.filterName}>
            <Trans>Language</Trans>
          </p>
          <div className={s.filterOption}>
            <Checkbox label={t`English`} />
            <span>17</span>
          </div>
          <div className={s.filterOption}>
            <Checkbox label={t`Ukrainian`} />
            <span>2</span>
          </div>
        </div>

        <div className={s.filter}>
          <p className={s.filterName}>
            <Trans>Format</Trans>
          </p>
          <div className={s.filterOption}>
            <Checkbox label={t`Online`} />
            <span>17</span>
          </div>
          <div className={s.filterOption}>
            <Checkbox label={t`On campus`} />
            <span>2</span>
          </div>
        </div>

        <div className={s.filter}>
          <p className={s.filterName}>
            <Trans>Duration</Trans>
          </p>
          <div className={s.filterOption}>
            <Checkbox label={t`1 to 3 hours`} />
            <span>17</span>
          </div>
          <div className={s.filterOption}>
            <Checkbox label={t`3 to 6 hours`} />
            <span>2</span>
          </div>
        </div>
      </div>

      <footer className={s.footer}>
        <button className={s.clearBtn}>
          <Trans>Clear filters</Trans>
        </button>
        <Button>
          <Trans>Apply filters</Trans>
        </Button>
      </footer>
    </div>,
    document.getElementById("root") as HTMLDivElement
  );
}
