import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { REGEXS } from "@shared/utils/const";

import Container from "@shared/ui/Container/Container";
import Input from "./ui/Input";
import Button from "@shared/ui/NewButton";
import { Trans, useLingui } from "@lingui/react/macro";
import { routes } from "@app/router/routes";
import { useHandleSubmit } from "./hooks/useHandleSubmit";

import s from "./LoginForm.module.scss";

export interface Inputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { t } = useLingui();

  const { isLoading, error, onSubmit } = useHandleSubmit();

  const [showPassword, setShowPassword] = useState(false);

  const passwordEndAdornment = (
    <button type="button" onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? "Hide" : "Show"}
    </button>
  );

  return (
    <Container className={s.container}>
      <div className={s.containerInner}>
        <h1 className={s.title}>
          <Trans>Log In</Trans>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.emailInpWrapper}>
            <Input
              type="email"
              placeholder={t`Email`}
              {...register("email", {
                required: t`This field is required`,
                pattern: {
                  value: REGEXS.EMAIL,
                  message: t`Invalid email address`,
                },
              })}
              // error={!!errors.email}
            />
            {errors.email && (
              <p role="alert" className={s.error}>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className={s.passwordInpWrapper}>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={t`Password`}
              {...register("password", {
                validate: {
                  required: (v) =>
                    !!v.trim().length || t`This field is required`,
                },
              })}
              // error={!!errors.password}
              endAdornment={passwordEndAdornment}
            />
            {errors.password && (
              <p role="alert" className={s.error}>
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className={s.btn}
            disabled={isLoading}
            color="blue"
          >
            <Trans>Log In</Trans>
          </Button>
          <Link
            to={`${routes.SIGN_UP}?${searchParams.toString()}`}
            className={s.link}
          >
            <Trans>Don't have an account?</Trans>
          </Link>
          {error && (
            <p
              className={s.error}
              style={{ marginTop: 16, textAlign: "center" }}
            >
              {error}
            </p>
          )}
        </form>
      </div>
    </Container>
  );
}
