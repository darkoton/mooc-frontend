import { Link, useLocation } from "react-router-dom";
import { Trans } from "@lingui/react/macro";

import Modal from "@shared/ui/Modal/Modal";
import { routes } from "@app/router/routes";

import s from "./LoginModal.module.scss";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const location = useLocation();

  const redirectUri = window.btoa(
    `${location.pathname}${location.hash ? location.hash : ""}`
  );

  return (
    <Modal open onClose={onClose} className={s.modal}>
      <div className={s.modalInner}>
        <h3 className={s.title}>
          <Trans>Login required</Trans>
        </h3>
        <p className={s.subtitle}>
          <Trans>Please log in to your account first</Trans>
        </p>
        <Link
          to={`${routes.LOGIN}?redirect_uri=${redirectUri}`}
          className={s.link}
        >
          Log in
        </Link>
      </div>
    </Modal>
  );
}
