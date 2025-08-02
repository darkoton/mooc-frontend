import { useLingui } from "@lingui/react/macro";
import { Language, LanguageType } from "../types/Course";

export function useCourseLanguageLabel(lang: LanguageType) {
  const { t } = useLingui();

  switch (lang) {
    case Language.English:
      return t`English`;
    case Language.Ukrainian:
      return t`Ukrainian`;
    case Language.Spanish:
      return t`Spanish`;
    default:
      return t`Not specified`;
  }
}
