import { FC } from "react";
import { Navigate } from "react-router-dom";

import { useAuthStore } from "@entities/auth";
import { routes } from "@app/router/routes";

export const withUnauth = (Component: FC) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const UnauthenticatedComponent = (props: any) => {
    const { auth } = useAuthStore();

    return !auth ? <Component {...props} /> : <Navigate to={routes.HOME} />;
  };

  return UnauthenticatedComponent;
};
