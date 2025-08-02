import { useLingui } from "@lingui/react/macro";

import { routes } from "@app/router/routes";

export const useBreadcrumbs = () => {
  const { t } = useLingui();

  return [
    {
      href: routes.HOME,
      label: t`Homepage`,
    },
    {
      href: routes.COURSES,
      label: t`Explore courses`,
    },
  ];
};
