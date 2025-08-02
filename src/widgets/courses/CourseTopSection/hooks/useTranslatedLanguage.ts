import { useLingui } from "@lingui/react/macro";

import { type LanguageType } from "@entities/course";

export const useTranslatedLanguage = (language: LanguageType | undefined) => {
  const { t } = useLingui();

  if (!language) {
    return "";
  }

  switch (language) {
    case "English":
      return t`English`;

    case "Ukrainian":
      return t`Ukrainian`;

    case "Spanish":
      return t`Spanish`;

    default:
      return "--";
  }
};
