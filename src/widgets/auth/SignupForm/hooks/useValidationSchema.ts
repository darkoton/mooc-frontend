import { useMemo } from "react";
import { useLingui } from "@lingui/react/macro";

import { REGEXS } from "@shared/utils/const";

export const useValidationSchema = () => {
  const { t } = useLingui();

  return useMemo(
    () => ({
      email: {
        required: t`This field is required`,
        pattern: {
          value: REGEXS.EMAIL,
          message: t`Invalid email address`,
        },
      },
      firstName: {
        required: t`This field is required`,
        minLength: {
          value: 2,
          message: t`Minimum length 2 characters`,
        },
        maxLength: {
          value: 150,
          message: t`Maximum length 150 characters`,
        },
      },
      lastName: {
        required: t`This field is required`,
        minLength: {
          value: 2,
          message: t`Minimum length 2 characters`,
        },
        maxLength: {
          value: 150,
          message: t`Maximum length 150 characters`,
        },
      },
      password1: {
        required: t`This field is required`,
        minLength: {
          value: 8,
          message: t`Minimum length 8 characters`,
        },
        validate: {
          notEntirelyNumeric: (v: string) =>
            /\D/.test(v.trim()) || t`Password is entirely numeric`,
        },
      },
      password2: (password1Value: string) => ({
        required: t`This field is required`,
        validate: {
          matchPassword1: (v: string) =>
            v === password1Value || t`Your passwords do no match`,
        },
      }),
    }),
    [t]
  );
};
