import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLingui } from "@lingui/react/macro";

import IconButton from "@shared/ui/IconButton/IconButton";
import Input from "@shared/ui/Input";
import { routes } from "@app/router/routes";

import SearchIcon from "@shared/assets/icons/search.svg?react";

import s from "./RedirectSearch.module.scss";

export default function RedirectSearch() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { t } = useLingui();

  const [search, setSearch] = useState("");

  return (
    <Input
      value={search}
      type="search"
      placeholder={t`Search 15 000+ no‑cost learning...`}
      endAdornment={
        <IconButton
          className={s.iconBtn}
          onClick={() => {
            navigate(
              `${routes.COURSES_SEARCH}/${category || ""}?q=${search.trim()}`
            );
          }}
        >
          <SearchIcon />
        </IconButton>
      }
      wrapperClassName={s.search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          navigate(
            `${routes.COURSES_SEARCH}/${category || ""}?q=${search.trim()}`
          );
        }
      }}
    />
  );
}
