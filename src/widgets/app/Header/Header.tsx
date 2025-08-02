import { lazy, Suspense, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trans, useLingui } from "@lingui/react/macro";

import Logo from "@features/app/Logo";
import Button from "@shared/ui/NewButton";
import { routes } from "@app/router/routes";
import { useAuthStore } from "@entities/auth";
import { useHandlePageScrollLock } from "./hooks/useHandlePageScrollLock";
import { useCloseUserMenu } from "./hooks/useCloseUserMenu";
import LangSwitcher from "./ui/LangSwitcher/LangSwitcher";

import ArrowDown from "./assets/icons/arrowDown.svg?react";
import ArrowRight from "@shared/assets/icons/arrowRight.svg?react";
import MenuIcon from "./assets/icons/menu.svg?react";

import s from "./Header.module.scss";

const AppMenu = lazy(() => import("./ui/Menu/Menu"));
const UserMenu = lazy(() => import("./ui/UserMenu/UserMenu"));
const CareersMenu = lazy(() => import("./ui/CareersMenu/CareersMenu"));

export default function NewHeader() {
  const { t } = useLingui();
  const navigate = useNavigate();

  const { auth } = useAuthStore();

  const headerRef = useHandlePageScrollLock();

  const [showMenu, setShowMenu] = useState(false);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuBtnRef = useRef<HTMLButtonElement>(null);
  useCloseUserMenu(setShowUserMenu);

  const careersBtnRef = useRef<HTMLButtonElement>(null);
  const [showCareersMenu, setShowCareersMenu] = useState(false);

  return (
    <div className={s.container}>
      <header className={s.header} ref={headerRef}>
        <div className={s.left}>
          <Logo className={s.logo} />
          <LangSwitcher className={s.langSwitcher} />
        </div>

        <div className={s.right}>
          <nav>
            <ul className={s.navList}>
              <li>
                <Link to={routes.HOME} className={s.navLink}>
                  <Trans>Home</Trans>
                </Link>
              </li>

              <li>
                <Link to={routes.COURSES} className={s.navLink}>
                  <Trans>Courses</Trans>
                </Link>
              </li>

              <li>
                <button
                  ref={careersBtnRef}
                  onClick={() => setShowCareersMenu(true)}
                >
                  <Trans>Discover careers</Trans> <ArrowDown />
                </button>
              </li>

              <li>
                <Link to="#" className={s.navLink}>
                  <Trans>Contact</Trans>
                </Link>
              </li>

              <li>
                <Link to={routes.FAQ} className={s.navLink}>
                  <Trans>Faq</Trans>
                </Link>
              </li>

              <li>
                <Link to={routes.BLOG} className={s.navLink}>
                  <Trans>Blog</Trans>
                </Link>
              </li>
            </ul>
          </nav>

          {auth ? (
            <button
              className={s.userMenuBtn}
              onClick={() => setShowUserMenu(!showUserMenu)}
              ref={userMenuBtnRef}
            >
              <img
                src={require("@shared/assets/icons/user.png")}
                alt={t`User`}
              />
            </button>
          ) : (
            <button
              className={s.signInBtn}
              onClick={() => navigate(routes.LOGIN)}
            >
              <Trans>Sign in</Trans>
            </button>
          )}

          <Button className={s.getStartedBtn}>
            <Trans>Get Started</Trans> <ArrowRight className={s.arrowRight} />
          </Button>

          <button className={s.menuBtn} onClick={() => setShowMenu(true)}>
            <MenuIcon />
          </button>
        </div>
      </header>

      <Suspense>
        {showMenu && <AppMenu onClose={() => setShowMenu(false)} />}
      </Suspense>
      <Suspense>
        {showUserMenu && (
          <UserMenu
            anchorElRef={userMenuBtnRef}
            onClose={() => setShowUserMenu(false)}
          />
        )}
      </Suspense>
      <Suspense>
        {showCareersMenu && (
          <CareersMenu
            anchorElRef={careersBtnRef}
            onClose={() => setShowCareersMenu(false)}
          />
        )}
      </Suspense>
    </div>
  );
}
