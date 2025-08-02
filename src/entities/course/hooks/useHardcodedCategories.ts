import { useMemo } from "react";
import { useLingui } from "@lingui/react/macro";
import { appEnv } from "@shared/config/envVars";

export const useHardcodedCategories = () => {
  const { t } = useLingui();

  return useMemo(
    () => [
      {
        name: "IT",
        id: appEnv === "dev" ? 1 : 22,
        subCategories: [
          {
            name: t`Computer Science`,
            id: appEnv === "dev" ? 1 : 47,
          },
          {
            name: t`Data Science`,
            id: appEnv === "dev" ? 2 : 48,
          },
          {
            name: t`Programming`,
            id: appEnv === "dev" ? 3 : 49,
          },
        ],
      },
      {
        name: t`Creative`,
        id: appEnv === "dev" ? 2 : 23,
        subCategories: [
          {
            name: t`Art and design`,
            id: appEnv === "dev" ? 5 : 51,
          },
          {
            name: t`Design`,
            id: appEnv === "dev" ? 18 : 64,
          },
          {
            name: t`Style and beauty`,
            id: appEnv === "dev" ? 21 : 67,
          },
        ],
      },
      {
        name: t`Machinery`,
        id: appEnv === "dev" ? 3 : 24,
        subCategories: [
          {
            name: t`Engineering`,
            id: appEnv === "dev" ? 6 : 52,
          },
        ],
      },
      {
        name: t`Education`,
        id: appEnv === "dev" ? 5 : 26,
        subCategories: [
          {
            name: t`Natural science`,
            id: appEnv === "dev" ? 8 : 54,
          },
          {
            name: t`Social science`,
            id: appEnv === "dev" ? 9 : 55,
          },
        ],
      },
    ],
    [t]
  );
};
