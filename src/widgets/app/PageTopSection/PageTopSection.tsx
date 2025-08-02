import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import clsx from "clsx";

import Breadcrumbs from "@shared/ui/Breadcrumbs";
import Container from "@shared/ui/Container/Container";
import Input from "@shared/ui/Input";
import IconButton from "@shared/ui/IconButton/IconButton";

import PixelArtDotsIcon from "@shared/assets/icons/pixelArtDots.svg?react";
import SearchIcon from "@shared/assets/icons/search.svg?react";

import s from "./PageTopSection.module.scss";

interface PageTopSectionProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: {
    href: string;
    label: string;
  }[];
  onSearch?: (search: string) => void;
  className?: string;
}

export default function PageTopSection({
  title,
  subtitle,
  breadcrumbs,
  onSearch,
  className,
}: PageTopSectionProps) {
  const { t } = useLingui();

  const [search, setSearch] = useState("");

  return (
    <section className={clsx(s.topSection, className)}>
      <Container>
        {breadcrumbs && (
          <Breadcrumbs items={breadcrumbs} className={s.breadcrumbs} />
        )}

        <h1 className={s.pageTitle}>
          <PixelArtDotsIcon />
          {title}
        </h1>
        {subtitle && <p className={s.subtitle}>{subtitle}</p>}

        {onSearch && (
          <Input
            value={search}
            type="search"
            placeholder={t`Search 15 000+ no‑cost learning...`}
            endAdornment={
              <IconButton
                className={s.iconBtn}
                onClick={() => onSearch(search)}
              >
                <SearchIcon />
              </IconButton>
            }
            wrapperClassName={s.search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch(search);
              }
            }}
          />
        )}
      </Container>
    </section>
  );
}
