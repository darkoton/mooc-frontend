import clsx from "clsx";

import { LOCALES, useTranslationsStore } from "@entities/translations";
import { LS_KEYS } from "@shared/utils/const";
import { api } from "@shared/api/api";

import s from "./LangSwitcher.module.scss";

interface LangSwitcherProps {
  className?: string;
}

export default function LangSwitcher({ className }: LangSwitcherProps) {
  const { locale, setLocale } = useTranslationsStore();

  const onClick = (locale: string) => {
    setLocale(locale);
    localStorage.setItem(LS_KEYS.LOCALE, locale);
    api.defaults.headers["Accept-Language"] = locale;
  };

  return (
    <div className={clsx(s.wrapper, className)}>
      <button
        type="button"
        className={clsx(s.langBtn, locale === LOCALES.EN && s.active)}
        onClick={() => onClick(LOCALES.EN)}
      >
        {LOCALES.EN}
      </button>
      <button
        type="button"
        className={clsx(s.langBtn, locale === LOCALES.UK && s.active)}
        onClick={() => onClick(LOCALES.UK)}
      >
        {LOCALES.UK}
      </button>
    </div>
  );
}
