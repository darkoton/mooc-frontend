import { useLingui } from "@lingui/react/macro";
import { StudyFormat, StudyFormatType } from "../types/Course";

export function useStudyFormatLabel(
  format: StudyFormatType | null | undefined
) {
  const { t } = useLingui();

  switch (format) {
    case StudyFormat.Online:
      return t`Online`;
    case StudyFormat.Offline:
      return t`Offline`;
    case StudyFormat.Hybrid:
      return t`Hybrid`;
    default:
      return t`Not specified`;
  }
}
