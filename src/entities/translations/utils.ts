import { LS_KEYS } from "@shared/utils/const";
import { LOCALES } from "./const";

export const getLocale = () => {
  const savedLocale = localStorage.getItem(LS_KEYS.LOCALE);
  if (!savedLocale) {
    return LOCALES.UK;
  }

  const locale = Object.values(LOCALES).find(
    (locale) => locale === savedLocale
  );
  return locale || LOCALES.UK;
};
