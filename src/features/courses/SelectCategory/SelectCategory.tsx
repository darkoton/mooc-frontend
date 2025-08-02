import { Link, useParams } from "react-router-dom";
import clsx from "clsx";
import { Trans } from "@lingui/react/macro";

import { routes } from "@app/router/routes";
import { useHardcodedCategories } from "@entities/course/hooks/useHardcodedCategories";

import s from "./SelectCategory.module.scss";

export default function SelectCategory() {
  const { category, subCategory } = useParams();

  const hardcodedCategories = useHardcodedCategories();

  return (
    <div className={s.aside}>
      <h3 className={s.asideTitle}>
        <Trans>Topics</Trans>
      </h3>

      <ul className={s.topicsList}>
        {hardcodedCategories.map(({ id, name, subCategories }) => (
          <li key={id}>
            <p className={s.topicRow}>
              <Link
                to={`${routes.CATEGORY_COURSES}/${id}`}
                className={clsx(category === `${id}` && s.active)}
              >
                {name}
              </Link>
            </p>

            {category === `${id}` && (
              <ul className={s.subtopicsList}>
                {subCategories.map(({ name, id }) => (
                  <li key={id}>
                    <p className={s.topicRow}>
                      <Link
                        to={`${routes.COURSES_SEARCH}/${category}/${id}`}
                        className={clsx(subCategory === `${id}` && s.subactive)}
                      >
                        {name}
                      </Link>{" "}
                      17
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
