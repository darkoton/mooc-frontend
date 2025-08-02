import { useTranslationsStore } from "@entities/translations";

export const useFormattedSalary = (avgSalary: {
  ua: number;
  ch: number;
  us: number;
}) => {
  const locale = useTranslationsStore((state) => state.locale);

  const uk = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "UAH",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(avgSalary.ua);

  const ch = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(avgSalary.ch);

  const us = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(avgSalary.us);

  return {
    uk,
    ch,
    us,
  };
};
