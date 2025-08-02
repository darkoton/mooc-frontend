import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type SubmitHandler } from "react-hook-form";
import { toast as notify } from "react-toastify";
import { useLingui } from "@lingui/react/macro";

import { type Inputs } from "../SignupForm";
import { useAuthStore } from "@entities/auth";
import { LS_KEYS } from "@shared/utils/const";
import { useUserStore } from "@entities/user";
import { routes } from "@app/router/routes";
import { api } from "@shared/api/api";

export const useHandleSubmit = () => {
  const urlSearchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const { t } = useLingui();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { signup } = useAuthStore();
  const updateUser = useUserStore((state) => state.update);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setError("");
      setIsLoading(true);

      const { first_name, last_name, ...signupData } = data;

      const { key } = await signup(signupData);
      localStorage.setItem(LS_KEYS.ACCESS_TOKEN, key);
      api.defaults.headers.Authorization = `Token ${key}`;

      await updateUser({ first_name, last_name });

      const redirectUri = urlSearchParams.get("redirect_uri");
      notify(t`Successfully registered`, { type: "success" });

      if (redirectUri) {
        return navigate(redirectUri);
      }
      navigate(routes.HOME);
      // eslint-disable-next-line
    } catch (err: any) {
      if (err.response?.status !== 400) {
        return setError(t`Unexpected error occured. Please try again later`);
      }

      if ("email" in err.response.data) {
        if (/exist|існує/i.test(err.response.data.email[0])) {
          return setError(t`User with that email already exist`);
        }
        return setError(t`Unexpected error occured. Please try again later`);
      }

      if ("password1" in err.response.data) {
        if (/common|відомий/i.test(err.response.data.password1[0])) {
          return setError(t`This password is too common`);
        }
      }

      setError(t`Unexpected error occured. Please try again later`);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, onSubmit };
};
