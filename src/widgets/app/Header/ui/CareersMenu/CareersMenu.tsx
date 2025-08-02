import { RefObject, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Plural, Trans } from "@lingui/react/macro";

import Menu from "@shared/ui/Menu/Menu";
import { careersCategories } from "../../utils/careersCategories";
import { routes } from "@app/router/routes";

import s from "./CareersMenu.module.scss";

interface CareersMenuProps {
  anchorElRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}

export default function CareersMenu({
  anchorElRef,
  onClose,
}: CareersMenuProps) {
  const [expandedCareers, setExpandedCareers] = useState(false);

  return createPortal(
    <Menu
      open
      anchorElRef={anchorElRef}
      onClose={onClose}
      className={s.careersPopover}
    >
      <div className={s.topRow}>
        <Trans>Explore career categories</Trans>
        <button
          className={s.toggleCategoriesBtn}
          onClick={() => setExpandedCareers(!expandedCareers)}
        >
          {expandedCareers ? (
            <Trans>Show fewer categories</Trans>
          ) : (
            <Trans>Show all categories</Trans>
          )}
        </button>
      </div>

      <ul className={s.careersCategoriesList}>
        {careersCategories
          .slice(0, expandedCareers ? undefined : 4)
          .map((careersCategory) => (
            <li key={careersCategory.title}>
              <Link
                to={`${routes.CATEGORY_CAREERS}/1`}
                className={s.categoryTitle}
              >
                {careersCategory.title}
              </Link>
              <p className={s.categoryCareersCount}>
                <Plural
                  value={careersCategory.count}
                  one="# Career"
                  few="# Careers"
                  other="# Careers"
                />
              </p>
            </li>
          ))}
      </ul>
    </Menu>,
    document.getElementById("root") as HTMLDivElement
  );
}
