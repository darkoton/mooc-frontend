import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { type SubmitHandler } from "react-hook-form";
import { useLingui } from "@lingui/react/macro";

import { type Inputs } from "../LoginForm";
import { useAuthStore } from "@entities/auth";
import { LS_KEYS } from "@shared/utils/const";
import { api } from "@shared/api/api";
import { routes } from "@app/router/routes";

export const useHandleSubmit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);

  const { t } = useLingui();

  const { login } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setError("");
      setIsLoading(true);

      const { key } = await login(data);
      localStorage.setItem(LS_KEYS.ACCESS_TOKEN, key);
      api.defaults.headers.Authorization = `Token ${key}`;

      const redirectUri = urlSearchParams.get("redirect_uri");
      if (redirectUri) {
        return navigate(window.atob(redirectUri));
      }
      navigate(routes.HOME);
      // eslint-disable-next-line
    } catch (err: any) {
      if (err.response?.status === 400) {
        return setError(t`Unable to log in with provided credentials`);
      }

      setError(t`Unexpected error occured. Please try again later`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    onSubmit,
  };
};
