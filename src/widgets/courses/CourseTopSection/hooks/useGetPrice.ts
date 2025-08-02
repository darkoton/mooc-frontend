import { useLingui } from "@lingui/react/macro";

export const useGetPrice = (price: string | undefined) => {
  const { t } = useLingui();

  if (!price) {
    return `-- ₴`;
  }

  if (+price === 0) {
    return t`Free course`;
  }

  return `${Math.round(+price)} ₴`;
};
