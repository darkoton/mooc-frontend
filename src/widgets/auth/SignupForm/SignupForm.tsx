import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";

import Container from "@shared/ui/Container/Container";
import Button from "@shared/ui/NewButton";
import { useForm } from "react-hook-form";
import { Trans, useLingui } from "@lingui/react/macro";
import { useValidationSchema } from "./hooks/useValidationSchema";
import { useHandleSubmit } from "./hooks/useHandleSubmit";
import Input from "./ui/Input";
import { routes } from "@app/router/routes";

import s from "./SignupForm.module.scss";

export interface Inputs {
  email: string;
  first_name: string;
  last_name: string;
  password1: string;
  password2: string;
}

export default function SignupForm() {
  const [searchParams] = useSearchParams();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm<Inputs>();
  const { t } = useLingui();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const password1Value = watch("password1");

  const { isLoading, error, onSubmit } = useHandleSubmit();

  const signupValidation = useValidationSchema();

  const passwordEndAdornment = (
    <button type="button" onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? "Hide" : "Show"}
    </button>
  );

  const repeatPasswordEndAdornment = (
    <button
      type="button"
      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
    >
      {showRepeatPassword ? "Hide" : "Show"}
    </button>
  );

  return (
    <Container className={s.container}>
      <div className={s.containerInner}>
        <h1 className={s.title}>
          <Trans>Signing Up</Trans>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inpWrapper}>
            <Input
              placeholder={t`Email`}
              type="email"
              {...register("email", signupValidation.email)}
              // error={!!errors.email}
            />
            {errors.email && (
              <p role="alert" className={s.error}>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className={s.inpWrapper}>
            <Input
              placeholder={t`First name`}
              {...register("first_name", signupValidation.firstName)}
              // error={!!errors.first_name}
            />
            {errors.first_name && (
              <p role="alert" className={s.error}>
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div className={s.inpWrapper}>
            <Input
              placeholder={t`Last name`}
              {...register("last_name", signupValidation.lastName)}
              // error={!!errors.last_name}
            />
            {errors.last_name && (
              <p role="alert" className={s.error}>
                {errors.last_name.message}
              </p>
            )}
          </div>
          <div className={s.inpWrapper}>
            <Input
              placeholder={t`Password`}
              type={showPassword ? "text" : "password"}
              {...register("password1", signupValidation.password1)}
              // error={!!errors.password1}
              endAdornment={passwordEndAdornment}
            />
            {errors.password1 && (
              <p role="alert" className={s.error}>
                {errors.password1.message}
              </p>
            )}
          </div>
          <div className={s.inpWrapper}>
            <Input
              placeholder={t`Repeat password`}
              type={showRepeatPassword ? "text" : "password"}
              {...register(
                "password2",
                signupValidation.password2(password1Value)
              )}
              endAdornment={repeatPasswordEndAdornment}
              // error={!!errors.password2}
            />
            {errors.password2 && (
              <p role="alert" className={s.error}>
                {errors.password2.message}
              </p>
            )}
          </div>
          <Button
            className={s.btn}
            type="submit"
            disabled={isLoading}
            color="blue"
          >
            <Trans>Sign Up</Trans>
          </Button>
          <Link
            to={`${routes.LOGIN}?${searchParams.toString()}`}
            className={s.link}
          >
            <Trans>Already have an account?</Trans>
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
