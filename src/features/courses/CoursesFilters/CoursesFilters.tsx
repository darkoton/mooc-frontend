import { type FormEventHandler } from "react";
import { useSearchParams } from "react-router-dom";
import { Trans, useLingui } from "@lingui/react/macro";

import Checkbox from "@shared/ui/Checkbox/Checkbox";

import s from "./CoursesFilters.module.scss";

export default function CoursesFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { t } = useLingui();

  const onChange: FormEventHandler<HTMLFormElement> = (e) => {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      searchParams.append(target.name, target.value);
    } else {
      searchParams.delete(target.name, target.value);
    }

    searchParams.delete("page");
    setSearchParams(searchParams.toString());
  };

  return (
    <form className={s.filters} onChange={onChange}>
      <div className={s.checkboxesGroup}>
        <h5>
          <Trans>Certificate</Trans>
        </h5>
        <p>
          <Checkbox
            label={t`With certificate`}
            checked={searchParams.has("certificate", "true")}
            name="certificate"
            value="true"
          />
          <span>2</span>
        </p>
      </div>

      <div className={s.checkboxesGroup}>
        <h5>
          <Trans>Language</Trans>
        </h5>
        <p>
          <Checkbox
            label={t`English`}
            checked={searchParams.has("language", "English")}
            name="language"
            value="English"
          />
          <span>2</span>
        </p>
        <p>
          <Checkbox
            label={t`Ukrainian`}
            checked={searchParams.has("language", "Ukrainian")}
            name="language"
            value="Ukrainian"
          />
          <span>2</span>
        </p>
      </div>

      <div className={s.checkboxesGroup}>
        <h5>
          <Trans>Price</Trans>
        </h5>
        <p>
          <Checkbox
            label={t`Free`}
            checked={searchParams.has("price", "free")}
            name="price"
            value="free"
          />
          <span>2</span>
        </p>
        <p>
          <Checkbox
            label={t`Paid`}
            checked={searchParams.has("price", "paid")}
            name="price"
            value="paid"
          />
          <span>2</span>
        </p>
      </div>

      <div className={s.checkboxesGroup}>
        <h5>
          <Trans>Duration</Trans>
        </h5>
        <p>
          <Checkbox
            label={t`Less than 1 week`}
            checked={searchParams.has("duration", "week")}
            name="duration"
            value={"week"}
          />
          <span>2</span>
        </p>
        <p>
          <Checkbox
            label={t`1-4 weeks`}
            checked={searchParams.has("duration", "fewWeeks")}
            name="duration"
            value={"fewWeeks"}
          />
          <span>2</span>
        </p>
        <p>
          <Checkbox
            label={t`1-3 months`}
            checked={searchParams.has("duration", "fewMonths")}
            name="duration"
            value={"fewMonths"}
          />
          <span>2</span>
        </p>
        <p>
          <Checkbox
            label={t`More than 3 months`}
            checked={searchParams.has("duration", "months")}
            name="duration"
            value={"months"}
          />
          <span>2</span>
        </p>
      </div>
    </form>
  );
}
