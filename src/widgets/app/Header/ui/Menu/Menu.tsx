import { Link } from "react-router-dom";
import { Trans, useLingui } from "@lingui/react/macro";

import Modal from "@shared/ui/Modal/Modal";
import { routes } from "@app/router/routes";
import { useAuthStore } from "@entities/auth";
import { useUserStore } from "@entities/user";
import LangSwitcher from "../LangSwitcher/LangSwitcher";

import CloseIcon from "./close.svg?react";

import s from "./Menu.module.scss";

interface MenuProps {
  onClose?: () => void;
}

export default function Menu({ onClose }: MenuProps) {
  const { t } = useLingui();

  const user = useUserStore((state) => state.user);
  const { auth } = useAuthStore();

  return (
    <Modal open onClose={onClose} className={s.modal}>
      <div className={s.innerWrapper}>
        <div className={s.menu}>
          <button className={s.closeBtn} onClick={onClose}>
            <CloseIcon />
          </button>

          <div className={s.topRow}>
            <h2 className={s.title}>
              <Trans>Menu</Trans>
            </h2>

            <Link to={auth ? "#" : routes.LOGIN} className={s.authLink}>
              <span className={s.authLinkText}>
                {auth ? (
                  `${user?.first_name || ""} ${user?.last_name || ""}`
                ) : (
                  <Trans>Sign in</Trans>
                )}
              </span>

              <span className={s.authLinkImgWrapper}>
                <img
                  src={require("@shared/assets/icons/user.png")}
                  alt={t`User`}
                />
              </span>
            </Link>
          </div>
          <nav>
            <ul className={s.navList}>
              <li>
                <Link to={routes.HOME}>
                  <Trans>Home</Trans>
                </Link>
              </li>
              <li>
                <Link to={routes.COURSES}>
                  <Trans>Courses</Trans>
                </Link>
              </li>
              <li>
                <Link to={"#"}>
                  <Trans>Contact</Trans>
                </Link>
              </li>
              <li>
                <Link to={routes.FAQ}>
                  <Trans>Faq</Trans>
                </Link>
              </li>
              <li>
                <Link to={routes.BLOG}>
                  <Trans>Blog</Trans>
                </Link>
              </li>
            </ul>
          </nav>

          <hr className={s.hr} />

          <div className={s.langSwitcherWrapper}>
            <LangSwitcher />
          </div>
        </div>
      </div>
    </Modal>
  );
}
