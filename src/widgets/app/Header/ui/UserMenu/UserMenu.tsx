import { type RefObject } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { Trans } from "@lingui/react/macro";
import { createPortal } from "react-dom";

import Menu from "@shared/ui/Menu/Menu";
import MenuItem from "@shared/ui/MenuItem/MenuItem";
import { routes } from "@app/router/routes";
import { useAuthStore } from "@entities/auth";
import { LS_KEYS } from "@shared/utils/const";
import { api } from "@shared/api/api";

import LogoutIcon from "../../assets/icons/logout.svg?react";

import s from "./UserMenu.module.scss";

interface UserMenuProps {
  anchorElRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}

export default function UserMenu({ anchorElRef, onClose }: UserMenuProps) {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  return createPortal(
    <Menu
      open
      anchorElRef={anchorElRef}
      onClose={onClose}
      className={s.userMenu}
    >
      <MenuItem component="link" to={"#"}>
        <Trans>Profile</Trans>
      </MenuItem>
      <MenuItem component="link" to={"#"}>
        <Trans>My courses</Trans>
      </MenuItem>
      <hr className={s.hr} />
      <MenuItem
        component="link"
        to={routes.FAQ}
        className={clsx(location.pathname === routes.FAQ && s.active)}
      >
        <Trans>Support</Trans>
      </MenuItem>
      <hr className={s.hr} />
      <MenuItem
        component="button"
        danger
        startIcon={<LogoutIcon />}
        onClick={() => {
          logout();
          localStorage.removeItem(LS_KEYS.ACCESS_TOKEN);
          api.defaults.headers.Authorization = null;
          onClose();
        }}
      >
        <Trans>Logout</Trans>
      </MenuItem>
    </Menu>,
    document.getElementById("root") as HTMLDivElement
  );
}
